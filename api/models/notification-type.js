const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
      identificator: { type: String, required: true },
      defaultTitle: { type: String, required: true },
      defaultDescription: { type: String, required: true },
      accountId: { type: String, required: true },
      type: { type: String, required: true }
    },
    { collection: "notification_type" }
  );
notificationSchema.index({ identificator: 1, accountId: 1 }, { unique: true });
const NotificationType = mongoose.model("notification_type", notificationSchema);

module.exports = NotificationType;