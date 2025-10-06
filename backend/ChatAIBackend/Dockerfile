# Use .NET SDK to build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy everything from the backend folder into container
COPY . .

# Navigate into the project folder (contains ChatAIBackend.csproj)
WORKDIR /src/backend/ChatAIBackend/ChatAIBackend

# Restore dependencies and publish
RUN dotnet restore "ChatAIBackend.csproj"
RUN dotnet publish "ChatAIBackend.csproj" -c Release -o /app/publish

# Final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://0.0.0.0:10000
EXPOSE 10000
ENTRYPOINT ["dotnet", "ChatAIBackend.dll"]
