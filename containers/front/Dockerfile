# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Dockerfile                                         :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: acoezard <acoezard@student.42nice.fr>      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/04/06 11:57:53 by acoezard          #+#    #+#              #
#    Updated: 2022/05/06 11:07:41 by acoezard         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

FROM		alpine:3.14

RUN			apk update
RUN			apk upgrade

#==== NODEJS ==================================================================#
RUN			apk add --update git nodejs-current npm
RUN			mkdir -p /var/www/html/front
VOLUME		["/var/www/html/front"]

EXPOSE		3000

WORKDIR 	/var/www/html/front
ENTRYPOINT	["./entrypoint.sh"]
