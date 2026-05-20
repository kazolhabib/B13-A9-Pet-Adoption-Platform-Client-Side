import { NextResponse } from "next/server";

const COOKIE_NAME = "pet_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const DEFAULT_USERS = [
  {
    _id: "user_demo_1",
    name: "Demo User",
    email: "demo@petheaven.com",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    password: "demo123",
  },
  {
    _id: "user_owner_1",
    name: "Shelter Admin",
    email: "owner@petheaven.com",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    password: "shelter123",
  },
];

const DEFAULT_PETS = [
  {
    _id: "pet_001",
    name: "Buddy",
    species: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    gender: "Male",
    location: "Brooklyn, NY",
    healthStatus: "Fully vaccinated and healthy",
    vaccinationStatus: "Fully Vaccinated",
    adoptionFee: 0,
    description: "A friendly companion who loves long walks and cuddles.",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
    ownerEmail: "owner@petheaven.com",
    ownerName: "Shelter Admin",
    status: "available",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    _id: "pet_002",
    name: "Luna",
    species: "Cat",
    breed: "Siamese",
    age: "1 year",
    gender: "Female",
    location: "Brooklyn, NY",
    healthStatus: "Spayed, vaccinated, affectionate",
    vaccinationStatus: "Fully Vaccinated",
    adoptionFee: 50,
    description: "A playful and affectionate cat who loves company.",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80",
    ownerEmail: "owner@petheaven.com",
    ownerName: "Shelter Admin",
    status: "available",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    _id: "pet_003",
    name: "Milo",
    species: "Rabbit",
    breed: "Mini Lop",
    age: "6 months",
    gender: "Male",
    location: "Queens, NY",
    healthStatus: "Vaccinated and gentle",
    vaccinationStatus: "Fully Vaccinated",
    adoptionFee: 25,
    description: "A soft little rabbit who enjoys quiet cuddles and carrot treats.",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
    ownerEmail: "owner@petheaven.com",
    ownerName: "Shelter Admin",
    status: "available",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    _id: "pet_004",
    name: "Bella",
    species: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    gender: "Female",
    location: "New York, NY",
    healthStatus: "Fully vaccinated and healthy",
    vaccinationStatus: "Fully Vaccinated",
    adoptionFee: 0,
    description: "Energetic and loving, Bella enjoys playing fetch and snuggling on the couch.",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    ownerEmail: "owner@petheaven.com",
    ownerName: "Shelter Admin",
    status: "available",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
  {
    _id: "pet_005",
    name: "Max",
    species: "Dog",
    breed: "German Shepherd",
    age: "3 years",
    gender: "Male",
    location: "Chicago, IL",
    healthStatus: "Fully vaccinated and trained",
    vaccinationStatus: "Fully Vaccinated",
    adoptionFee: 100,
    description: "Smart and protective, Max is a trained companion who loves his family.",
    image: "https://images.unsplash.com/photo-1589965716319-4a041b58fa8a?auto=format&fit=crop&w=800&q=80",
    ownerEmail: "owner@petheaven.com",
    ownerName: "Shelter Admin",
    status: "available",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    _id: "pet_006",
    name: "Oliver",
    species: "Cat",
    breed: "Maine Coon",
    age: "4 months",
    gender: "Male",
    location: "Seattle, WA",
    healthStatus: "Vaccinated and playful",
    vaccinationStatus: "Fully Vaccinated",
    adoptionFee: 75,
    description: "A curious kitten who loves interactive toys and warm laps.",
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80",
    ownerEmail: "owner@petheaven.com",
    ownerName: "Shelter Admin",
    status: "available",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    _id: "pet_007",
    name: "Charlie",
    species: "Dog",
    breed: "French Bulldog",
    age: "1.5 years",
    gender: "Male",
    location: "Austin, TX",
    healthStatus: "Fully vaccinated and spunky",
    vaccinationStatus: "Fully Vaccinated",
    adoptionFee: 50,
    description: "A playful little guy who loves attention and short walks around the neighborhood.",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
    ownerEmail: "owner@petheaven.com",
    ownerName: "Shelter Admin",
    status: "available",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
  {
    _id: "pet_008",
    name: "Mango",
    species: "Bird",
    breed: "Cockatiel",
    age: "2 years",
    gender: "Male",
    location: "Miami, FL",
    healthStatus: "Healthy and vocal",
    vaccinationStatus: "Not Applicable",
    adoptionFee: 40,
    description: "A playful and social bird who loves to whistle and interact with people.",
    image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&w=800&q=80",
    ownerEmail: "owner@petheaven.com",
    ownerName: "Shelter Admin",
    status: "available",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 0).toISOString(),
  },
  {
    _id: "pet_009",
    name: "Daisy",
    species: "Dog",
    breed: "Labrador Retriever",
    age: "1.5 years",
    gender: "Female",
    location: "Los Angeles, CA",
    healthStatus: "Fully vaccinated and energetic",
    vaccinationStatus: "Fully Vaccinated",
    adoptionFee: 60,
    description: "Sweet and playful Daisy loves swimming and playing with other dogs.",
    image: "https://images.unsplash.com/photo-1544568100-847a948585b0?auto=format&fit=crop&w=800&q=80",
    ownerEmail: "owner@petheaven.com",
    ownerName: "Shelter Admin",
    status: "available",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 0.5).toISOString(),
  },
];

function getDb() {
  if (!globalThis.__PET_ADOPTION_DB) {
    globalThis.__PET_ADOPTION_DB = {
      users: [...DEFAULT_USERS],
      pets: [...DEFAULT_PETS],
      requests: [],
      sessions: {},
    };
  }
  return globalThis.__PET_ADOPTION_DB;
}

function sanitizeUser(user) {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
}

function getSessionId(request) {
  return request.cookies.get(COOKIE_NAME)?.value || null;
}

function getCurrentUser(request) {
  const db = getDb();
  const sessionId = getSessionId(request);
  if (!sessionId) return null;
  const session = db.sessions[sessionId];
  if (!session) return null;
  return db.users.find((user) => user._id === session.userId) || null;
}

function createSession(userId) {
  const db = getDb();
  const sessionId = `session_${crypto.randomUUID()}`;
  db.sessions[sessionId] = {
    userId,
    createdAt: new Date().toISOString(),
  };
  return sessionId;
}

function createJsonResponse(body, status = 200, cookies = []) {
  const response = NextResponse.json(body, { status });
  cookies.forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value, cookie.options);
  });
  return response;
}

function notFound(message = "Resource not found") {
  return createJsonResponse({ success: false, message }, 404);
}

function unauthorized(message = "Authentication required") {
  return createJsonResponse({ success: false, message }, 401);
}

function badRequest(message = "Invalid request") {
  return createJsonResponse({ success: false, message }, 400);
}

function formatRequest(request) {
  const db = getDb();
  const pet = db.pets.find((item) => item._id === request.petId);
  return {
    ...request,
    petName: pet?.name || "Unknown",
    petImage: pet?.image || "",
  };
}

function filterPets(pets, search, species) {
  const speciesValues = species && species !== "All"
    ? species.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean)
    : null;

  return pets.filter((pet) => {
    if (pet.status !== "available") return false;

    const matchesSpecies = !speciesValues || speciesValues.includes(pet.species.toLowerCase());
    const matchesSearch = !search || [pet.name, pet.breed, pet.species].some((value) =>
      value.toLowerCase().includes(search.toLowerCase())
    );
    return matchesSpecies && matchesSearch;
  });
}

function sortPets(pets, sort) {
  const sorted = [...pets];
  switch (sort) {
    case "oldest":
      return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "newest":
    default:
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}

async function getHandler(request, { params }) {
  const db = getDb();
  const { path } = await params;
  const currentUser = getCurrentUser(request);
  const [resource, resourceId, action] = path || [];

  if (resource === "me") {
    if (!currentUser) {
      return createJsonResponse({ success: false, message: "Not authenticated" }, 200);
    }
    return createJsonResponse({ success: true, user: sanitizeUser(currentUser) });
  }

  if (resource === "pets") {
    if (!resourceId) {
      const url = new URL(request.url);
      const search = url.searchParams.get("search") || "";
      const species = url.searchParams.get("species") || "";
      const sort = url.searchParams.get("sort") || "newest";
      const filtered = filterPets(db.pets, search, species);
      const sorted = sortPets(filtered, sort);
      return createJsonResponse({ success: true, data: sorted });
    }

    if (resourceId === "my-listings") {
      if (!currentUser) return unauthorized();
      const listings = db.pets.filter((pet) => pet.ownerEmail === currentUser.email);
      return createJsonResponse({ success: true, data: listings });
    }

    const pet = db.pets.find((item) => item._id === resourceId);
    if (!pet) return notFound("Pet not found");
    return createJsonResponse({ success: true, data: pet });
  }

  if (resource === "requests") {
    if (!resourceId) {
      return badRequest("Please specify a request type: /api/requests/my-requests or /api/requests/received");
    }

    if (resourceId === "my-requests") {
      if (!currentUser) return unauthorized();
      const requests = db.requests
        .filter((req) => req.requesterEmail === currentUser.email)
        .map(formatRequest);
      return createJsonResponse({ success: true, data: requests });
    }

    if (resourceId === "received") {
      if (!currentUser) return unauthorized();
      const requests = db.requests
        .filter((req) => {
          const pet = db.pets.find((item) => item._id === req.petId);
          return pet?.ownerEmail === currentUser.email;
        })
        .map(formatRequest);
      return createJsonResponse({ success: true, data: requests });
    }

    return notFound("Request not found");
  }

  return notFound();
}

async function postHandler(request, { params }) {
  const db = getDb();
  const { path } = await params;
  const currentUser = getCurrentUser(request);
  const [resource, subResource] = path || [];
  
  let body;
  try {
    body = await request.json();
  } catch (error) {
    body = {};
  }

  if (resource === "login") {
    const { email, password } = body || {};
    if (!email || !password) return badRequest("Email and password are required.");

    const user = db.users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
      return createJsonResponse({ success: false, message: "Invalid email or password." }, 401);
    }

    const sessionId = createSession(user._id);
    return createJsonResponse(
      { success: true, user: sanitizeUser(user) },
      200,
      [
        {
          name: COOKIE_NAME,
          value: sessionId,
          options: { httpOnly: true, sameSite: "lax", path: "/", maxAge: SESSION_MAX_AGE },
        },
      ]
    );
  }

  if (resource === "register") {
    const { name, email, password, photoUrl } = body || {};
    if (!name || !email || !password) return badRequest("Name, email, and password are required.");

    if (db.users.some((item) => item.email.toLowerCase() === email.toLowerCase())) {
      return createJsonResponse({ success: false, message: "Email is already registered." }, 409);
    }

    const newUser = {
      _id: `user_${crypto.randomUUID()}`,
      name,
      email,
      photoUrl: photoUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      password,
    };
    db.users.push(newUser);
    const sessionId = createSession(newUser._id);
    return createJsonResponse(
      { success: true, user: sanitizeUser(newUser) },
      201,
      [
        {
          name: COOKIE_NAME,
          value: sessionId,
          options: { httpOnly: true, sameSite: "lax", path: "/", maxAge: SESSION_MAX_AGE },
        },
      ]
    );
  }

  if (resource === "auth" && subResource === "google") {
    const { credential } = body || {};
    if (!credential) return badRequest("Google credential is required.");

    const email = `google.user.${credential.slice(-8)}@petheaven.com`;
    let user = db.users.find((item) => item.email === email);
    if (!user) {
      user = {
        _id: `user_${crypto.randomUUID()}`,
        name: "Google User",
        email,
        photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        password: "google-mock",
      };
      db.users.push(user);
    }
    const sessionId = createSession(user._id);
    return createJsonResponse(
      { success: true, user: sanitizeUser(user) },
      200,
      [
        {
          name: COOKIE_NAME,
          value: sessionId,
          options: { httpOnly: true, sameSite: "lax", path: "/", maxAge: SESSION_MAX_AGE },
        },
      ]
    );
  }

  if (resource === "logout") {
    const sessionId = getSessionId(request);
    if (sessionId) {
      delete db.sessions[sessionId];
    }
    return createJsonResponse(
      { success: true, message: "Logged out" },
      200,
      [
        {
          name: COOKIE_NAME,
          value: "",
          options: { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 },
        },
      ]
    );
  }

  if (resource === "pets") {
    if (!currentUser) return unauthorized();
    const { name, species, breed, age, gender, healthStatus, vaccinationStatus, adoptionFee, location, image, description } = body || {};
    if (!name || !species || !breed || !age || !gender || !location || !description) {
      return badRequest("Missing required pet fields.");
    }

    const newPet = {
      _id: `pet_${crypto.randomUUID()}`,
      name,
      species,
      breed,
      age,
      gender,
      location,
      healthStatus: healthStatus || "Healthy and active",
      vaccinationStatus: vaccinationStatus || "Fully Vaccinated",
      adoptionFee: Number(adoptionFee) || 0,
      description,
      image: image || "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
      ownerEmail: currentUser.email,
      ownerName: currentUser.name,
      status: "available",
      createdAt: new Date().toISOString(),
    };
    db.pets.push(newPet);
    return createJsonResponse({ success: true, data: newPet }, 201);
  }

  if (resource === "requests") {
    if (!currentUser) return unauthorized();
    const { petId, phone, address, notes } = body || {};
    if (!petId || !phone || !address) {
      return badRequest("Pet ID, phone, and address are required.");
    }
    const pet = db.pets.find((item) => item._id === petId);
    if (!pet) return notFound("Pet not found");
    if (pet.status === "adopted") {
      return createJsonResponse({ success: false, message: "This pet has already been adopted." }, 409);
    }

    const newRequest = {
      _id: `req_${crypto.randomUUID()}`,
      petId,
      requesterEmail: currentUser.email,
      requesterName: currentUser.name,
      petOwnerEmail: pet.ownerEmail,
      phone,
      address,
      notes: notes || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    db.requests.push(newRequest);
    return createJsonResponse({ success: true, data: newRequest }, 201);
  }

  return notFound();
}

async function deleteHandler(request, { params }) {
  const db = getDb();
  const { path } = await params;
  const currentUser = getCurrentUser(request);
  const [resource, resourceId] = path || [];

  if (resource === "pets" && resourceId) {
    if (!currentUser) return unauthorized();
    const petIndex = db.pets.findIndex((item) => item._id === resourceId);
    if (petIndex === -1) return notFound("Pet not found");
    const pet = db.pets[petIndex];
    if (pet.ownerEmail !== currentUser.email) {
      return unauthorized("You do not have permission to delete this pet.");
    }
    db.pets.splice(petIndex, 1);
    db.requests = db.requests.filter((req) => req.petId !== resourceId);
    return createJsonResponse({ success: true, message: "Pet listing deleted." });
  }

  return notFound();
}

async function patchHandler(request, { params }) {
  const db = getDb();
  const { path } = await params;
  const currentUser = getCurrentUser(request);
  const [resource, requestId, action] = path || [];

  if (resource === "requests" && requestId && action) {
    if (!currentUser) return unauthorized();
    const requestRecord = db.requests.find((req) => req._id === requestId);
    if (!requestRecord) return notFound("Request not found");

    const pet = db.pets.find((item) => item._id === requestRecord.petId);
    if (!pet) return notFound("Associated pet not found");
    if (pet.ownerEmail !== currentUser.email) {
      return unauthorized("You do not have permission to update this request.");
    }

    if (action === "approve") {
      requestRecord.status = "approved";
      pet.status = "adopted";
      db.requests.forEach((req) => {
        if (req.petId === pet._id && req._id !== requestId) {
          req.status = "rejected";
        }
      });
      return createJsonResponse({ success: true, message: "Request approved successfully." });
    }

    if (action === "reject") {
      requestRecord.status = "rejected";
      return createJsonResponse({ success: true, message: "Request rejected." });
    }

    return badRequest("Unsupported request action.");
  }

  return notFound();
}

export async function GET(request, { params }) {
  const resolvedParams = await params;
  return getHandler(request, { params: resolvedParams });
}

export async function POST(request, { params }) {
  const resolvedParams = await params;
  return postHandler(request, { params: resolvedParams });
}

export async function DELETE(request, { params }) {
  const resolvedParams = await params;
  return deleteHandler(request, { params: resolvedParams });
}

export async function PATCH(request, { params }) {
  const resolvedParams = await params;
  return patchHandler(request, { params: resolvedParams });
}

export async function PUT(request, { params }) {
  return createJsonResponse({ success: false, message: "PUT is not supported." }, 405);
}

export async function OPTIONS(request, { params }) {
  return createJsonResponse({ success: false, message: "OPTIONS is not supported." }, 405);
}
