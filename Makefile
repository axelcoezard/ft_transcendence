# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: acoezard <acoezard@student.42nice.fr>      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/04/11 15:19:09 by acoezard          #+#    #+#              #
#    Updated: 2022/05/17 15:43:45 by acoezard         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

all: start

start:
	@docker-compose up	--build \
						--remove-orphans

stop:
	@docker-compose dowm

clean:
	@rm -rf	apps/*/node_modules \
			apps/*/dist \
			~/Library/Caches

re: stop clean start

.PHONY: all start stop
