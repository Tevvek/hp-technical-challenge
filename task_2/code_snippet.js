import superagent from "superagent";
import { User, Shop } from "./models";
import mongoose from "mongoose";

const AUTH_URL = "https://url.to.auth.system.com/invitation";

async function inviteUser(request, response) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { body: invitationBody, params } = request;
    const { shopId } = params;

    const invitationResponse = await superagent
      .post(AUTH_URL)
      .send(invitationBody);

    if (invitationResponse.status === 200) {
      return response.status(400).json({
        error: true,
        message: "User already invited to this shop",
      });
    }

    if (invitationResponse.status === 201) {
      const { authId } = invitationResponse.body;
      const { email } = invitationBody;

      const createdUser = await findOrCreateUser(authId, email);
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return response.status(500).send({ message: "No shop found" });
      }

      const { invitationId } = invitationResponse.body;
      addInvitationToShop(shop, invitationId);
      addUserToShop(shop, createdUser._id);

      await shop.save();

      await session.commitTransaction();
      session.endSession();

      return response.json(invitationResponse.body);
    }

    await session.commitTransaction();
    session.endSession();

    return response.json(invitationResponse.body);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error inviting user:", error);
    return response.status(500).send({ message: error.message });
  }
}

async function findOrCreateUser(authId, email) {
  try {
    return await User.findOneAndUpdate(
      { authId },
      { authId, email },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error("Error finding or creating user:", error);
    throw error;
  }
}

function addInvitationToShop(shop, invitationId) {
  if (!shop.invitations.includes(invitationId)) {
    shop.invitations.push(invitationId);
  }
}

function addUserToShop(shop, userId) {
  if (!shop.users.includes(userId)) {
    shop.users.push(userId);
  }
}

export { inviteUser };
export default inviteUser;
