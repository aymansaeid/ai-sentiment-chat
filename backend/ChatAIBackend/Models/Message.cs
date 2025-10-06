namespace ChatAIBackend.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string UserName { get; set; } = null!;
        public string Content { get; set; } = null!;
        public string Sentiment { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
