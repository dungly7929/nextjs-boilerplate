import { getPayloadClient } from "../../../get-payload";
import { publicProcedure, router } from "../trpc";

export const ticketRouter = router({
  getTicket: publicProcedure.query(async () => {
    const payload = await getPayloadClient();
    const { docs: ticket } = await payload.find({
      collection: "kaban-tickets",
    });

    return { ticket };
  }),
});
