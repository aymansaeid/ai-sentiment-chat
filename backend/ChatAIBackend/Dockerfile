FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy everything from the repository
COPY . .

# Move to the actual project folder where the .csproj exists
WORKDIR /src/ai-service/backend/ChatAIBackend/ChatAIBackend

# Restore and publish the project
RUN dotnet restore "ChatAIBackend.csproj"
RUN dotnet publish "ChatAIBackend.csproj" -c Release -o /app/publish

# Final image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
ENTRYPOINT ["dotnet", "ChatAIBackend.dll"]
