# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Dockerfile                                         :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: acoezard <acoezard@student.42nice.fr>      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/04/06 11:57:53 by acoezard          #+#    #+#              #
#    Updated: 2022/04/11 14:12:29 by acoezard         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

FROM		alpine:3.14

RUN			apk update
RUN			apk upgrade

#==== NODEJS ==================================================================#
RUN			apk add --update nodejs-current npm
RUN			mkdir -p /var/www/html/
VOLUME		["/var/www/html"]

EXPOSE		3000
EXPOSE		6000

WORKDIR 	/var/www/html
ENTRYPOINT	["./entrypoint.sh"]
