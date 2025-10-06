FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy from parent directory (repository root)
COPY ["../backend/ChatAlBackend.sln", "./"]
COPY ["../backend/ChatAlBackend/ChatAlBackend.csproj", "ChatAlBackend/"]
RUN dotnet restore "ChatAlBackend.sln"

# Copy everything else from parent
COPY ../ ./

# Build and publish
WORKDIR "/src/ChatAlBackend"
RUN dotnet build "ChatAlBackend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ChatAlBackend.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ChatAlBackend.dll"]