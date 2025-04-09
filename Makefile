SERVER_CMD = cd server && bun run dev
CLIENT_CMD = cd client && bun run dev

.PHONY: start server client

server:
ifeq ($(OS), Windows_NT)
	start cmd /k "$(SERVER_CMD)"
else
	@case "$$(uname)" in \
		Darwin*) osascript -e 'tell application "Terminal" to do script "$(SERVER_CMD)"' ;; \
		Linux*) gnome-terminal -- bash -c "$(SERVER_CMD); exec bash" ;; \
		*) echo "Unsupported platform for server" ;; \
	esac
endif

client:
ifeq ($(OS), Windows_NT)
	start cmd /k "$(CLIENT_CMD)"
else
	@case "$$(uname)" in \
		Darwin*) osascript -e 'tell application "Terminal" to do script "$(CLIENT_CMD)"' ;; \
		Linux*) gnome-terminal -- bash -c "$(CLIENT_CMD)" ;; \
		*) echo "Unsupported platform for client" ;; \
	esac
endif

start:
	@$(MAKE) server
	@$(MAKE) client
