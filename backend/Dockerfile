FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ["ChatAlBackend.sln", "./"]
COPY ["ChatAlBackend/ChatAlBackend.csproj", "ChatAlBackend/"]
RUN dotnet restore "ChatAlBackend.sln"

# Copy everything else
COPY . .

# Build and publish
WORKDIR "/src/ChatAlBackend"
RUN dotnet build "ChatAlBackend.csproj" -c Release -o /app/build
RUN dotnet publish "ChatAlBackend.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ChatAlBackend.dll"]