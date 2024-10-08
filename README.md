# Documentação 

## Proxy Reverso com Nginx na AWS

## 1. Instalar o Nginx

Se ainda não tiver o Nginx instalado na sua máquina, execute o comando:

```bash
sudo apt update         # Para distribuições baseadas em Debian, como Ubuntu
sudo apt install nginx
```

verificar se o nginx está rodando na sua máquina
```
sudo systemctl status nginx 
```

## 2. Configurar o proxy reverso

Edite o arquivo de configuração do nginx em ```/etc/nginx/sites-available/defaul```:
```
sudo vim /etc/nginx/sites-available/default
```

Adicione ou modifique o seguinte bloco de configuração (substitua conforme necessário):

```

server {
    listen 80;
    server_name <O IP publico da sua máquina em que está configurado o nginx>;

    location / {
        proxy_pass http://127.0.0.1;  # O Ip público máquina que você pretende redirecionar
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

- altere ```server_name```  para o domínio que deseja usar ou o IP público da instância em que está o Nginx.
- O ```proxy_pass```  está redirecionando as requisições para ```http://127.0.0.1```

  Reinicie o Nginx para aplicar as mudanças:
```
sudo systemctl restart nginx
```

## 3. Configuração da sua máquina servidor que irá receber a requisição

1) Conecte à sua máquina servidor
2) instale o nginx na sua máquina servidor
3) crie um arquivo html: ``` echo '<html><body><h1>Redirecionado pelo Nginx!</h1><p>Você foi redirecionado para a Máquina 3.</p></body></html>' | sudo tee /var/www/html/index.html ```
4) Entre no arquivo de configuração do Nginx (igual ao passo 2) em ```/etc/nginx/sites-available/default```
5) Faça a seguinte configuração abaixo:
```
server {
    listen 80;
    server_name <IP_DA_MAQUINA_Servidor>;  # Substitua pelo IP da Máquina servidor

    location / {
        root /var/www/html;
        index index.html;
    }
}

```

Reinicie o Nginx para aplicar as mudanças:
```
sudo systemctl restart nginx
```

## 4. Testar a configuração do nginx

Antes de reiniciar o Nginx, verifique se a configuração está correta:

```
sudo nginx -t
```

## 5.  Configurações adicionais caso não tenha feito (Security Group) (AWS)

Verifique se a porta ```80``` (HTTP) ou ```443``` (HTTPS) está aberta no Security Group da sua instância EC2.

1) No console da AWS, vá para a página da sua instância EC2.
2) Encontre o Security Group associado à instância.
3) Clique em Editar regras de entrada.
4) Adicione regras para permitir tráfego HTTP ```(80)``` ou HTTPS ```(443)```, como no exemplo abaixo:
- <strong>Tipo:</strong> HTTP
- <strong>Protocolo:</strong> TCP
- <strong>Porta:</strong> 80
- <strong>Fonte/origem:</strong>  0.0.0.0/0 (para permitir de qualquer IP)

## 6. Agora você pode testar através de url http com o ip da sua máquina Nginx
Acesse pela Url do seu navegador

```
http://<ip da sua máquina em que está configurado o Nginx>
```

- Com essa configurações deverá redirecionar para sua máquina servidor ao acessar o IP da máquina Nginx
