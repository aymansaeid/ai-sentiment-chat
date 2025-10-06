FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ChatAIBackend.sln ./
COPY ChatAIBackend/ChatAIBackend.csproj ./ChatAIBackend/

# Restore dependencies
RUN dotnet restore "ChatAIBackend/ChatAIBackend.csproj"

# Copy everything else
COPY . ./

# Build and publish
WORKDIR /src/ChatAIBackend
RUN dotnet publish "ChatAIBackend.csproj" -c Release -o /app/publish

# Final image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://0.0.0.0:$PORT
EXPOSE 10000

ENTRYPOINT ["dotnet", "ChatAIBackend.dll"]