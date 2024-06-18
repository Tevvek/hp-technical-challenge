exports.inviteUser = async function (req, res) {
  const invitationBody = req.body;
  const shopId = req.params.shopId;
  const authUrl = "https://url.to.auth.system.com/invitation";

  const invitationResponse = await superagent
    .post(authUrl)
    .send(invitationBody);

  if (invitationResponse.status === 201) {
    const createdUser = await User.findOneAndUpdate(
      {
        authId: invitationResponse.body.authId,
      },
      {
        authId: invitationResponse.body.authId,
        email: invitationBody.email,
      },
      {
        upsert: true,
        new: true,
      }
    );

    Shop.findById(shopId).exec(function (err, shop) {
      if (err || !shop) {
        return res.status(500).send(err || { message: "No shop found" });
      }
      if (shop.invitations.indexOf(invitationResponse.body.invitationId)) {
        shop.invitations.push(invitationResponse.body.invitationId);
      }
      if (shop.users.indexOf(createdUser._id) === -1) {
        shop.users.push(createdUser);
      }
      shop.save();
    });
  } else if (invitationResponse.status === 200) {
    res.status(400).json({
      error: true,
      message: "User already invited to this shop",
    });
    return;
  }
  res.json(invitationResponse);
};
