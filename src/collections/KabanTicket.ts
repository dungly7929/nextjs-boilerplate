import { KabanTicket, User } from "@/payload-types";
import {
  AfterChangeHook,
  BeforeChangeHook,
} from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";

const addUser: BeforeChangeHook<KabanTicket> = async ({ req, data }) => {
  const user = req.user;

  return { ...data, user: user.id };
};

const isAdminOrHasAccess =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined;

    if (!user) return false;
    if (user.role === "admin") return true;

    const userTicketIDs = (user.kabantickets || []).reduce<Array<string>>(
      (acc, ticket) => {
        if (!ticket) return acc;
        if (typeof ticket === "string") {
          acc.push(ticket);
        } else {
          acc.push(ticket.id);
        }

        return acc;
      },
      []
    );

    return {
      id: {
        in: userTicketIDs,
      },
    };
  };

export const KabanTickets: CollectionConfig = {
  slug: "kaban-tickets",
  access: {
    create: () => true,
    read: isAdminOrHasAccess(),
    update: isAdminOrHasAccess(),
    delete: isAdminOrHasAccess(),
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "status",
      type: "select",
      options: ["todo", "in-progress", "done"],
      defaultValue: "todo",
    },
  ],
};
