using System.Web.Http;
using System.Web.Http.Cors;

namespace CrudReactWebAPiE
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // CORS'u etkinleştirin
            var cors = new EnableCorsAttribute("http://localhost:5173", "*", "*");
            config.EnableCors(cors);

            // Web API yapılandırması ve hizmetler

            // Web API yolları
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
