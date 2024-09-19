#!/bin/sh

# Get the path of this script and the project root path
SCRIPTS_PATH=$(dirname "$(realpath "$0")")
PROJECT_ROOT_PATH=$(dirname "$SCRIPTS_PATH")

# Set this script permissions to execute
chmod +x $SCRIPTS_PATH/clear-all.sh

# ================================================
# Project Files
# ================================================
# Delete node_modules (if exists)
if [ -d "$PROJECT_ROOT_PATH/node_modules" ]; then
  echo "[*] Deleting '/node_modules' folder"
  echo "[*] Type your sudo password: "
  sudo rm -rf "$PROJECT_ROOT_PATH/node_modules"
fi

# Delete dist (if exists)
if [ -d "$PROJECT_ROOT_PATH/dist" ]; then
  echo "[*] Deleting '/dist' folder"
  sudo rm -rf "$PROJECT_ROOT_PATH/dist"
fi

# Delete dist (if exists)
if [ -d "$PROJECT_ROOT_PATH/coverage" ]; then
  echo "[*] Deleting '/coverage' folder"
  sudo rm -rf "$PROJECT_ROOT_PATH/coverage"
fi

# Delete dist (if exists)
if [ -d "$PROJECT_ROOT_PATH/.next" ]; then
  echo "[*] Deleting '/coverage' folder"
  sudo rm -rf "$PROJECT_ROOT_PATH/.next"
fi

# # ================================================
# # Docker Files
# # ================================================
# Remove all containers
docker rm -f $(docker ps -aq)

# Remove all images
docker rmi -f $(docker images -aq)

# Remove all networks
docker network rm $(docker network ls -q)

# Remove all volumes
docker system prune --volumes -af
docker volume rm $(docker volume ls -qf dangling=true)
