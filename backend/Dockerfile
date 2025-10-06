FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the entire repository content
COPY . .

# Restore and build from the correct path
RUN dotnet restore "backend/ChatAlBackend.sln"
RUN dotnet publish "backend/ChatAlBackend/ChatAlBackend.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ChatAlBackend.dll"]