import { helpers, Router } from "https://deno.land/x/oak/mod.ts";
import { Language } from "../../languages/index.ts";
import { Country } from "../../countries/index.ts";
import callService, {
  availableServices,
  Service,
} from "../../services/index.ts";

const router = new Router();

router
  .get("/v1/get", async (ctx) => {
    const query = helpers.getQuery(ctx, { mergeParams: true });
    const { service, term, country = "us", language = "en" } = query;

    if (!service || !term) {
      ctx.response.status = 401;
      ctx.response.body = {
        success: false,
        reason: `Missing required "service" or "term" query params.`,
      };
      return;
    }

    if (!availableServices.includes(service as unknown as Service)) {
      ctx.response.status = 401;
      ctx.response.body = {
        success: false,
        reason: `${service} is not a supported service.`,
        availableServices,
      };
      return;
    }

    const serviceResponse = await callService({
      term,
      language: language as Language,
      country: country as Country,
      service: service as Service,
    });

    ctx.response.status = 200;
    ctx.response.body = serviceResponse;
  });

export default router;
