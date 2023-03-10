# Transportation Management System
Bu projenin temel amacı, olağan üstü hal ve doğal afet durumlarında toplanan ayni yardımların sistematik bir 
şekilde doğru miktarlar ile gideceği yere ulaştırılmasına olanak sağlayacak TMS (Transportation Management System) 
ürününün geliştirilmesidir. 

## API Documentation
Swagger dokümantasyonu: [Swagger API](http://54.247.166.128:3000/api).

## Technologies
- Nest.js
- AWS-SDK (for Amazon SNS)
- Mongoose
- Eslint
- Pino
- Jest
- Swagger

## Integrations
- Optiyol - rota planlama ve rota optimizasyonu   -   (https://www.optiyol.com/tr/)
  - Optiyol Web Panel                             -   (https://route.optiyol.com/)
  - Optiyol Mobil Client                          -   (Android : https://play.google.com/store/apps/details?id=com.optiyol.prime&hl=en&gl=US&pli=1
                                                       IOS     : https://apps.apple.com/tr/app/optiyol-driver/id1603418648?l=tr )
### Local development
1. `.env` dosyası oluşturun ve [config](https://github.com/acikkaynak/afetlojistik-backend/blob/main/src/config/configuration.ts) dosyasındaki keyleri, değerleriyle ekleyin.
2. `npm ci` komutuyla paketleri indirin.
3. `npm run start` komutuyla servisi çalıştırın.
4. Servis http://localhost:3000'de ayakta olmalı. (Örneğin: http://localhost:3000/health).
5. POST /user ile kullanıcınızı oluşturun. Veritabanı üzerinden kullanıcınızın isAdmin ve active değerlerini "true" olarak güncelleyin.
- NOT: Bu adımda ve sms gönderen diğer adımlarda, amazon hesabınız yoksa, sms gönderme kısmını comment out ile kapatabilirsiniz.
7. POST /user/login ile giriş yapın.
8. POST /user/verify ile telefon numaranıza gelen sms kodunu veya bypass ettiyseniz bypass kodunu girin ve dönen token'ı kopyalayın.
9. Swagger sayfasında sağ üstteki "Authorize" alanına token'ınızı kaydedin. Diğer endpointlere gönderilen istekte bu tokenı kullanacaktır.

### Integration 
Rota planlama ve oluşturulan tedarik verilerinin takibi amacıyla Optiyol'un rota planlama çözümünü kullanıyoruz.
Bu çözüm `.env` içerisinde bulunan bazı alanları zorunlu kılmaktadır.Bu alanlar TMS verilerinin Optiyol sistemine doğru bir şekilde yollanabilmesi için gereklidir.
Entegrasyon içerisinde TMS tarafında oluşturulan yardım verilerini (Sürücü bilgisi, Yardım bilgisi) şeklinde 2 ayrı talep ile entegratör olan Optiyol'a gönderilmesi amaçlanmıştır.

## Reference
[Nest](https://github.com/nestjs/nest) is an [MIT licensed](LICENSE) open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)
