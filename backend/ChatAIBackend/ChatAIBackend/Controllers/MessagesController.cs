using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChatAIBackend.Models;

namespace ChatAIBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly DB _context;
        private readonly HttpClient _httpClient;


        public MessagesController(DB context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpClient = httpClientFactory.CreateClient();
        }


        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] MessageDto dto)
        {
            var aiUrl = "http://localhost:5001/analyze";


            var payload4HF = new { text = dto.Content };



            var msg = await _httpClient.PostAsJsonAsync(aiUrl, payload4HF);

            if (!msg.IsSuccessStatusCode)
            {
                var raw = await msg.Content.ReadAsStringAsync();
                return StatusCode((int)msg.StatusCode, $"AI service error: {raw}");
            }

            var result = await msg.Content.ReadFromJsonAsync<Dictionary<string, string>>();
            string sentiment = result != null && result.ContainsKey("sentiment") ? result["sentiment"] : "UNKNOWN";


            


            var message = new Message
            {
                UserName = dto.UserName,
                Content = dto.Content,
                Sentiment = sentiment
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return Ok(message);
        }

        [HttpGet]
        public async Task<IActionResult> GetMessages()
        {
            var messages = await _context.Messages.OrderByDescending(m => m.Id).ToListAsync();
            return Ok(messages);
        }
    }
}
