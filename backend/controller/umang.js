const aadhaarStatusSchema = require("../zod/adharClearance");
const AadhaarLog = require("../models/adhar");

const getAadhaarStatus = async (req, res) => {
  try {
    const parsed = aadhaarStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.format() });
    }

    const { aadhaar, dob } = parsed.data;
    const maskedAadhaar = `XXXX-XXXX-${aadhaar.slice(-4)}`;

    const curtime = new Date();
    await AadhaarLog.create({
      maskedAadhaar: maskedAadhaar,
      dob,
      timestamp: curtime
    });

    return res.json({
      status: "Active",
      aadhaar_number: aadhaar,
      dob,
      last_updated: curtime
    });
  } catch (error) {
    console.error("Error in /aadhaar-status:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = getAadhaarStatus;
