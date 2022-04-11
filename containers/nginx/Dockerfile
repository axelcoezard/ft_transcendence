# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Dockerfile                                         :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: acoezard <acoezard@student.42nice.fr>      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/04/06 11:57:53 by acoezard          #+#    #+#              #
#    Updated: 2022/04/11 11:15:09 by acoezard         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

FROM		alpine:3.14

RUN			apk update
RUN			apk upgrade

#==== NGINX ===================================================================#
RUN			apk add nginx
RUN			mkdir -p /var/www/html/

COPY		conf/default.conf /etc/nginx/http.d/default.conf

#==== OPENSSL =================================================================#
RUN			apk add openssl
RUN			mkdir -p /etc/nginx/ssl

RUN			openssl req \
			-newkey rsa:4096 \
			-x509 \
			-sha256 \
			-days 365 \
			-nodes \
			-subj "/C=FR/ST=PACA/L=Nice/O=42/OU=acoezard/CN=localhost" \
			-keyout /etc/nginx/ssl/transcendence.key \
			-out /etc/nginx/ssl/transcendence.cert

#RUN			openssl dhparam -out /etc/nginx/ssl/transcendence.dhparam 2048

#==== OPENRC ==================================================================#
RUN			apk add openrc
RUN			rc-update add nginx default

#==== NODEJS ==================================================================#
RUN			apk add --update nodejs-current npm

VOLUME		["/var/www/html"]
WORKDIR 	/var/www/html
ENTRYPOINT	["./entrypoint.sh"]

#==============================================================================#
EXPOSE	80
EXPOSE	443
EXPOSE 	3000
EXPOSE 	6000
CMD		["nginx", "-g", "daemon off;"]

