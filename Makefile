# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: acoezard <acoezard@student.42nice.fr>      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/04/11 15:19:09 by acoezard          #+#    #+#              #
#    Updated: 2022/05/26 14:33:02 by acoezard         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

all: start

start:
	@docker-compose	up	--build \
						--remove-orphans

stop:
	@docker-compose	dowm

clean:
	@rm -rf			apps/*/node_modules
	@rm -rf			apps/*/dist
	@rm -rf			~/Library/Caches

fclean: clean
	@docker rm -f	back front nginx postgres
	@docker rmi -f	back front nginx postgres

re: stop fclean start

.PHONY: all start stop clean fclean re
