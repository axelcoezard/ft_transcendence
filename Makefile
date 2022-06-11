# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: acoezard <acoezard@student.42nice.fr>      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/04/11 15:19:09 by acoezard          #+#    #+#              #
#    Updated: 2022/06/06 23:14:45 by acoezard         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

all: start

start:
	@docker-compose	up	--build \
						--remove-orphans

stop:
	@docker-compose	down

clean:
	@rm -rf			apps/*/node_modules
	@rm -rf			apps/*/dist
	@rm -rf			apps/*/build

fclean: clean
	@docker rm -f	back front nginx postgres
	@docker rmi -f	back front nginx postgres

re: stop fclean start

.PHONY: all start stop clean fclean re
