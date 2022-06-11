# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Dockerfile                                         :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: acoezard <acoezard@student.42nice.fr>      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/04/06 11:57:53 by acoezard          #+#    #+#              #
#    Updated: 2022/04/11 15:22:55 by acoezard         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

FROM	alpine:3.14

RUN		apk update
RUN		apk upgrade

#==== NODEJS ==================================================================#
RUN		apk add --update git nodejs-current npm python3-dev

#==== NGINX ===================================================================#
RUN		apk add nginx
RUN		mkdir -p /var/www/html/
COPY	conf/default.conf /etc/nginx/http.d/default.conf

#==== OPENRC ==================================================================#
RUN		apk add openrc
RUN		rc-update add nginx default

#==============================================================================#
VOLUME		["/var/www/html"]

EXPOSE	80

WORKDIR 	/var/www/html
ENTRYPOINT	["./entrypoint.sh"]

