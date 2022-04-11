# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: acoezard <acoezard@student.42nice.fr>      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/04/11 15:19:09 by acoezard          #+#    #+#              #
#    Updated: 2022/04/11 15:19:11 by acoezard         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

all: start

start:
	@docker-compose up --build

stop:
	@docker-compose dowm

.PHONY: all start stop
