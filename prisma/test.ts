import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const colleges = [
  {
    "id": "clo4ms7s30002vjjs7r9r9on1",
    "name": "SDM Law College, Mangalore",
    "details": null,
    "createdAt": "2025-03-29T04:57:06.552Z",
    "updatedAt": "2025-03-29T04:59:15.897Z",
    "password": "hello"
  },
  {
    "id": "clonw0pqq0000x9jhfb6la6qb",
    "name": "St. Aloysius College, Mangalore",
    "details": null,
    "createdAt": "2025-03-29T04:56:03.758Z",
    "updatedAt": "2025-03-29T04:59:15.897Z",
    "password": "hello"
  },
  {
    "id": "clonw0pqr0001x9jhhushh0ig",
    "name": "SDPT First Grade College, Kateelu",
    "details": null,
    "createdAt": "2025-03-29T04:57:06.552Z",
    "updatedAt": "2025-03-29T04:59:15.897Z",
    "password": "hello"
  },
  {
    "id": "clonw0pqr0002x9jhoauzw7ov",
    "name": "Shri Madhwa Vadiraja Institute of Technology and Management, Bantakal",
    "details": null,
    "createdAt": "2025-03-29T04:55:52.166Z",
    "updatedAt": "2025-03-29T04:59:15.897Z",
    "password": "hello"
  },
  {
    "id": "clonw0pqs0003x9jh2nnf2v5v",
    "name": "Govinda Dasa Degree College, Suratkal",
    "details": null,
    "createdAt": "2025-03-29T04:56:38.791Z",
    "updatedAt": "2025-03-29T04:59:15.897Z",
    "password": "hello"
  }
]

for (const college of colleges) {
  prisma.college.create({
    data: college
  }).then((college) => {
    console.log(JSON.stringify(college, null, 2))
  }
  ).catch(console.error)
}
