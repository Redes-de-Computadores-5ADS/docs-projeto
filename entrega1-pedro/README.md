# Documentação 

## Proxy Reverso e Load Balancer com Nginx na AWS

## 1. Criar 4 instâncias EC2 na AWS

Será necessário a criação de 4 instâncias (elegíveis para nível gratuito) para que seja possível demonstrar o Load Balancer em 3 servidores distintos, uma máquina será configurado o Proxy Reverso e Load Blancer, as outras 3 serão os servidores com a aplicação.

## 2. Instalar o Nginx

Se ainda não tiver o Nginx instalado nas instâncias criadas, execute o comando:

```bash
sudo apt update         # Para distribuições baseadas em Debian, como Ubuntu
sudo apt install nginx
```

verificar se o nginx está rodando na sua máquina
```
sudo systemctl status nginx 
```

## 3. Configuração da sua máquina servidor que irá receber a requisição


Edite o arquivo de configuração do nginx em cada instância que atuará como servidor ```/etc/nginx/sites-enabled/default```:
```
sudo vim /etc/nginx/sites-enabled/default
```

Adicione ou modifique o seguinte bloco de configuração (substitua conforme necessário):

```
server {
        listen 8080; # Porta que o nginx ouvirá
        listen [::]:80;

        server_name server1; # nome dado ao servidor

        root /var/www/server1; # diretório onde aplicação está
        index index.html; # aplicação contida no diretório acima

        location / {
                try_files $uri $uri/ =404; # mensagem de erro caso não encontre aplicação
        }
}

```

  Reinicie o Nginx para aplicar as mudanças:
```
sudo nginx -s reload
```

## 4. Configurar o proxy reverso

1) Na máquina que atuará como Load Balancer e proxy reverso vá até o diretório ```/etc/nginx/conf.d/``` e crie o arquivo load_balancer.conf
2) Faça a seguinte configuração

```
upstream servidorexemplo {
        server <IP_DA_MAQUINA_Servidor_1>:8080; # Substitua pelo IP da Máquina servidor e pela porta que o servidor está configurado
        server <IP_DA_MAQUINA_Servidor_2>:8080; 
        server <IP_DA_MAQUINA_Servidor_3>:8080;
}

server {
        listen 8081; # Porta que o nginx ouvirá
        server_name load;

        location /{
                proxy_pass http://servidorexemplo;
        }
}

```

- Nas primeiras linhas é configurado o Load Balancer, upstream é uma palavra reservada para fazer o balanceamento de carga, no exemplo, como as máquinas servidores são extamente iguais em capacidade, não é colocado peso, o próprio Nginx irá dividir as requisições igualmente para as 3.

- No bloco location ocorre o proxy reverso, pois as requisições serão direcionadas ao "servidorexemplo", onde constam os servidores com a aplicação.

Reinicie o Nginx para aplicar as mudanças:
```
sudo nginx -s reload
```

## 5. Testar a configuração do nginx

Antes de reiniciar o Nginx, verifique se a configuração está correta:

```
sudo nginx -t
```

## 6.  Configurações adicionais caso não tenha feito (Security Group) (AWS)

Verifique se a porta ```80``` (HTTP) ou ```443``` (HTTPS) está aberta no Security Group da sua instância EC2.

1) No console da AWS, vá para a página da sua instância EC2.
2) Encontre o Security Group associado à instância.
3) Clique em Editar regras de entrada.
4) Adicione regras para permitir tráfego HTTP ```(80)``` ou HTTPS ```(443)```, como no exemplo abaixo:
- <strong>Tipo:</strong> HTTP
- <strong>Protocolo:</strong> TCP
- <strong>Porta:</strong> 80
- <strong>Fonte/origem:</strong>  0.0.0.0/0 (para permitir de qualquer IP)
5) Também é essencial fazer a liberação das portas nas quais o servidores estão usando, bem como a que o proxy reverso irá utilizar, no caso 8080 e 8081

## 7. Agora você pode testar através de url http com o ip da sua máquina Nginx
Acesse pela Url do seu navegador

```
IP_MAQUINA_PROXY_REVERSO:PORTA
```

- Com essa configurações deverá redirecionar para sua máquina servidor ao acessar o IP da máquina Nginx