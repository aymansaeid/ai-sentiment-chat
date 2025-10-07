using ChatAIBackend.Models;
using Microsoft.EntityFrameworkCore;
namespace ChatAIBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            builder.Services.AddHttpClient();
            builder.Services.AddDbContext<DB>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<DB>();
                dbContext.Database.Migrate();
            }

            // Configure the HTTP request pipeline.

            // awlays use swagger in dev and prod

            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseCors("AllowAll");
            // app.UseHttpsRedirection();

            app.UseAuthorization();
          

            app.MapControllers();

            var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
            app.Urls.Add($"http://0.0.0.0:{port}");
            app.Run();
        }
    }
}
