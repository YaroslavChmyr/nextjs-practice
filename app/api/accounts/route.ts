import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { ForbiddenError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";

// GET /api/accounts
export async function GET() {
  try {
    await dbConnect();

    const accounts = await Account.find();

    return NextResponse.json(
      {
        success: true,
        data: accounts,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// POST /api/accounts
export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    const validatedData = AccountSchema.parse(body);

    const existingAccount = await Account.findOne({
      provider: validatedData.provider,
      providerAccountId: validatedData.providerAccountId,
    });
    if (existingAccount)
      throw new ForbiddenError(
        "Account already exists with this provider and account ID.",
      );

    const newAccount = await Account.create(validatedData);

    return NextResponse.json(
      {
        success: true,
        data: newAccount,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
