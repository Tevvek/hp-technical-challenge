const AUTH_URL = "https://url.to.auth.system.com/invitation";

exports.inviteUser = async function (request, response) {
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
    return response.json(invitationResponse.body);
  }

  return response.json(invitationResponse.body);
};

async function findOrCreateUser(authId, email) {
  return await User.findOneAndUpdate(
    { authId },
    { authId, email },
    { upsert: true, new: true }
  );
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
