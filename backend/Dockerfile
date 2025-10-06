# Use .NET SDK to build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy everything from the backend context (which includes ChatAIBackend/)
COPY . .

# Navigate into project folder
WORKDIR /src/ChatAIBackend/ChatAIBackend

# Restore and publish
RUN dotnet restore "ChatAIBackend.csproj"
RUN dotnet publish "ChatAIBackend.csproj" -c Release -o /app/publish

# Final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://0.0.0.0:10000
EXPOSE 10000
ENTRYPOINT ["dotnet", "ChatAIBackend.dll"]