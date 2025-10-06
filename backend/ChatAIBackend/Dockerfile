FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file first to restore dependencies
COPY backend/ChatAIBackend/ChatAIBackend/ChatAIBackend.csproj ./ChatAIBackend/
RUN dotnet restore "./ChatAIBackend/ChatAIBackend.csproj"

# Copy the rest of the source code
COPY backend/ChatAIBackend/ ./
WORKDIR /src/ChatAIBackend/ChatAIBackend

# Build and publish
RUN dotnet build "ChatAIBackend.csproj" -c Release -o /app/build
RUN dotnet publish "ChatAIBackend.csproj" -c Release -o /app/publish

# Final image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://0.0.0.0:10000
EXPOSE 10000
ENTRYPOINT ["dotnet", "ChatAIBackend.dll"]