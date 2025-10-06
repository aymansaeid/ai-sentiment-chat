FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the entire solution/project structure
COPY ai-service/backend/ChatAIBackend/ ./

# Navigate to the project directory
WORKDIR /src/ChatAIBackend

# Restore and publish
RUN dotnet restore "ChatAIBackend.csproj"
RUN dotnet publish "ChatAIBackend.csproj" -c Release -o /app/publish

# Final image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://0.0.0.0:10000
EXPOSE 10000
ENTRYPOINT ["dotnet", "ChatAIBackend.dll"]