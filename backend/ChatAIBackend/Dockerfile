# Stage 1: Build Environment
# Use the official .NET 8 SDK image. Change the version if your project uses a different one (e.g., 7.0, 6.0).
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the solution and project files. This step is separated to leverage Docker's layer caching.
# It will only re-run the 'dotnet restore' if your project dependencies change.
# Note: The paths are relative to the Docker context root, which you've set to '.' in render.yaml.
COPY ["ai-service/backend/ChatAIBackend/ChatAIBackend.sln", "ai-service/backend/ChatAIBackend/"]
COPY ["ai-service/backend/ChatAIBackend/ChatAIBackend/ChatAIBackend.csproj", "ai-service/backend/ChatAIBackend/ChatAIBackend/"]

# Restore NuGet packages for the entire solution.
RUN dotnet restore "ai-service/backend/ChatAIBackend/ChatAIBackend.sln"

# Copy the rest of the source code into the container.
COPY . .

# Set the working directory to the project folder before publishing.
WORKDIR "/src/ai-service/backend/ChatAIBackend/ChatAIBackend"

# Publish the application for release. The output will be placed in the /app/publish directory.
# Using /p:UseAppHost=false is a best practice for containerized apps, as we will call the DLL directly.
RUN dotnet publish "ChatAIBackend.csproj" -c Release -o /app/publish /p:UseAppHost=false

# ---

# Stage 2: Final Runtime Image
# Use the lightweight ASP.NET runtime image, which is smaller than the full SDK.
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Copy the published application from the build stage.
COPY --from=build /app/publish .

# Render automatically provides the PORT environment variable, which your Program.cs already uses.
# EXPOSE is not strictly required by Render but is a good practice for documenting which port the container listens on.
EXPOSE 10000

# Define the entry point for the container. This command runs your .NET application.
ENTRYPOINT ["dotnet", "ChatAIBackend.dll"]