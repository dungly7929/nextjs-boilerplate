import { Access, CollectionConfig } from "payload/types";

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user.role === "admin") return true;

  return {
    id: {
      equals: user.id,
    },
  };
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: {},
  access: {
    read: adminsAndUser,
    create: () => true,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  admin: {
    hidden: ({ user }) => user.role !== "admin",
    defaultColumns: ["id"],
  },
  fields: [
    {
      name: "kabantickets",
      label: "Kaban-Tickets",
      admin: {
        condition: () => false,
      },
      type: "relationship",
      relationTo: "kaban-tickets",
      hasMany: true,
    },
    {
      name: "role",
      defaultValue: "user",
      required: true,
      type: "select",
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
  ],
};
