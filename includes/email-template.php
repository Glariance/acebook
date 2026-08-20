<?php
/**
 * HTML email template for inquiry notifications (branding from FORM_SITE_NAME).
 * Expects: $data (array), $form_source (string), $admin_email, $subject
 */
if (!isset($data) || !is_array($data)) return;
$brand = defined('FORM_SITE_NAME') ? FORM_SITE_NAME : 'Crescent Hill Publishers';
$esc = function($v) {
    if ($v === null || $v === '') return '—';
    return htmlspecialchars(is_string($v) ? $v : (string)$v, ENT_QUOTES, 'UTF-8');
};
$has_campaign = !empty($data['package_name']) || (isset($data['lead_amount']) && $data['lead_amount'] !== null && $data['lead_amount'] !== '') || !empty($data['campaign_name']) || !empty($data['source']) || !empty($data['campaign_offer']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry - <?php echo htmlspecialchars($brand, ENT_QUOTES, 'UTF-8'); ?></title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0; padding:0; background-color:#050816; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#050816;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px; width:100%; background:#020617; border-radius:18px; box-shadow: 0 18px 45px rgba(15,23,42,0.7); overflow: hidden; border:1px solid rgba(148,163,184,0.3);">
          <!-- Header -->
          <tr>
            <td style="background: radial-gradient(circle at 0 0, #a855f7 0, transparent 55%), radial-gradient(circle at 100% 0, #ec4899 0, transparent 55%), linear-gradient(135deg, #4c1d95 0%, #db2777 100%); padding: 28px 32px 32px 32px; text-align: center;">
              <?php $logo_url = defined('FORM_LOGO_URL') ? FORM_LOGO_URL : ''; ?>
              <?php if ($logo_url !== '') { ?>
              <p style="margin: 0 0 8px 0;"><img src="<?php echo $esc($logo_url); ?>" alt="<?php echo $esc($brand); ?>" style="height: 32px; width: auto; max-height: 32px; display: inline-block; vertical-align: middle;" width="120" height="32" /></p>
              <?php } else { ?>
              <div style="display:inline-flex; align-items:center; gap:10px; margin-bottom:8px;">
                <div style="width:36px; height:36px; border-radius:999px; background:linear-gradient(135deg,#a855f7,#ec4899); display:inline-flex; align-items:center; justify-content:center; color:#ffffff; font-weight:800; font-size:18px;">C</div>
                <div style="text-align:left;">
                  <div style="margin:0; font-size:15px; font-weight:700; color:#ffffff; letter-spacing:0.02em;"><?php echo $esc($brand); ?></div>
                </div>
              </div>
              <?php } ?>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: rgba(255,255,255,0.9); font-weight:500;">New inquiry received</p>
              <p style="margin: 8px 0 0 0; font-size: 12px; color: rgba(248,250,252,0.8);"><?php echo $esc(date('F j, Y \a\t g:i A')); ?></p>
            </td>
          </tr>
          <!-- Contact details -->
          <tr>
            <td style="padding: 24px 28px 18px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding-bottom: 14px;">
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.4px; color: #a855f7;">Contact details</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-radius: 14px; background: radial-gradient(circle at 0 0, rgba(168,85,247,0.16) 0, transparent 60%), radial-gradient(circle at 100% 0, rgba(236,72,153,0.18) 0, transparent 60%), rgba(15,23,42,0.96); border:1px solid rgba(148,163,184,0.35);">
                      <tr><td style="padding: 12px 16px; border-bottom: 1px solid rgba(30,64,175,0.5); font-size: 13px; color: #9ca3af; width: 34%;"><strong style="color: #e5e7eb;">Name</strong></td><td style="padding: 12px 16px; border-bottom: 1px solid rgba(30,64,175,0.5); font-size: 13px; color: #e5e7eb;"><?php echo $esc($data['name']); ?></td></tr>
                      <tr><td style="padding: 12px 16px; border-bottom: 1px solid rgba(30,64,175,0.5); font-size: 13px; color: #9ca3af;"><strong style="color: #e5e7eb;">Email</strong></td><td style="padding: 12px 16px; border-bottom: 1px solid rgba(30,64,175,0.5); font-size: 13px;"><a href="mailto:<?php echo $esc($data['email']); ?>" style="color: #a855f7; text-decoration: none;"><?php echo $esc($data['email']); ?></a></td></tr>
                      <tr><td style="padding: 12px 16px; border-bottom: 1px solid rgba(30,64,175,0.5); font-size: 13px; color: #9ca3af;"><strong style="color: #e5e7eb;">Phone</strong></td><td style="padding: 12px 16px; border-bottom: 1px solid rgba(30,64,175,0.5); font-size: 13px; color: #e5e7eb;"><?php echo $esc($data['phone']); ?></td></tr>
                      <tr><td style="padding: 12px 16px; font-size: 13px; color: #9ca3af; vertical-align: top;"><strong style="color: #e5e7eb;">Message</strong></td><td style="padding: 12px 16px; font-size: 13px; color: #e5e7eb; white-space: pre-wrap;"><?php echo nl2br($esc($data['message'])); ?></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- User location, device & tracking (saved in database) -->
          <tr>
            <td style="padding: 0 28px 18px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding-bottom: 6px;">
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.4px; color: #a855f7;">User location, IP &amp; device</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 6px;">
                    <span style="font-size: 11px; color: #94a3b8;">All of this is saved in your database for the brand.</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-radius: 14px; background: radial-gradient(circle at 0 0, rgba(59,130,246,0.18) 0, transparent 60%), rgba(15,23,42,0.98); border:1px solid rgba(148,163,184,0.32);">
                      <tr><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px; color: #9ca3af; width: 38%;"><strong style="color: #e5e7eb;">Submitted at</strong></td><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px; color: #e5e7eb;"><?php echo $esc(date('Y-m-d H:i:s')); ?></td></tr>
                      <tr><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px; color: #9ca3af;"><strong style="color: #e5e7eb;">Form source</strong></td><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px; color: #e5e7eb;"><?php echo $esc($form_source); ?></td></tr>
                      <tr><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px; color: #9ca3af;"><strong style="color: #e5e7eb;">IP address</strong></td><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px; color: #e5e7eb;"><?php echo $esc($data['ip']); ?></td></tr>
                      <tr><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px; color: #9ca3af;"><strong style="color: #e5e7eb;">Country</strong></td><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px; color: #e5e7eb;"><?php echo $esc($data['country']); ?> <?php if (!empty($data['country_code'])) echo '(' . $esc($data['country_code']) . ')'; ?></td></tr>
                      <tr><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px; color: #9ca3af;"><strong style="color: #e5e7eb;">Region / State</strong></td><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px; color: #e5e7eb;"><?php echo $esc($data['region']); ?></td></tr>
                      <tr><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px; color: #9ca3af;"><strong style="color: #e5e7eb;">City</strong></td><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px; color: #e5e7eb;"><?php echo $esc($data['city']); ?></td></tr>
                      <tr><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px; color: #9ca3af;"><strong style="color: #e5e7eb;">ISP / Organization</strong></td><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px; color: #e5e7eb;"><?php echo $esc($data['isp'] ?: $data['org']); ?></td></tr>
                      <tr><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px; color: #9ca3af;"><strong style="color: #e5e7eb;">Landing page</strong></td><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px;"><a href="<?php echo $esc($data['landing_page']); ?>" style="color: #38bdf8; text-decoration: none; word-break: break-all;"><?php echo $esc($data['landing_page']); ?></a></td></tr>
                      <tr><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px; color: #9ca3af;"><strong style="color: #e5e7eb;">Referrer</strong></td><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.55); font-size: 12px;"><a href="<?php echo $esc($data['referrer_url']); ?>" style="color: #38bdf8; text-decoration: none; word-break: break-all;"><?php echo $esc($data['referrer_url']); ?></a></td></tr>
                      <tr><td style="padding: 10px 16px; font-size: 12px; color: #9ca3af; vertical-align: top;"><strong style="color: #e5e7eb;">User agent</strong></td><td style="padding: 10px 16px; font-size: 11px; color: #cbd5f5; word-break: break-all;"><?php echo $esc($data['user_agent']); ?></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <?php if ($has_campaign) { ?>
          <!-- Campaign / lead -->
          <tr>
            <td style="padding: 0 28px 24px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding-bottom: 10px;">
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.4px; color: #a855f7;">Campaign / lead</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-radius: 14px; background: radial-gradient(circle at 0 0, rgba(236,72,153,0.2) 0, transparent 60%), rgba(15,23,42,0.98); border:1px solid rgba(148,163,184,0.35);">
                      <?php if (!empty($data['package_name'])) { ?><tr><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.6); font-size: 12px; color: #9ca3af;"><strong style="color: #e5e7eb;">Package</strong></td><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.6); font-size: 12px; color: #e5e7eb;"><?php echo $esc($data['package_name']); ?></td></tr><?php } ?>
                      <?php if ($data['lead_amount'] !== null && $data['lead_amount'] !== '') { ?><tr><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.6); font-size: 12px; color: #9ca3af;"><strong style="color: #e5e7eb;">Lead amount</strong></td><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.6); font-size: 12px; color: #e5e7eb;"><?php echo $esc($data['lead_amount']); ?></td></tr><?php } ?>
                      <?php if (!empty($data['campaign_name'])) { ?><tr><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.6); font-size: 12px; color: #9ca3af;"><strong style="color: #e5e7eb;">Campaign name</strong></td><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.6); font-size: 12px; color: #e5e7eb;"><?php echo $esc($data['campaign_name']); ?></td></tr><?php } ?>
                      <?php if (!empty($data['source'])) { ?><tr><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.6); font-size: 12px; color: #9ca3af;"><strong style="color: #e5e7eb;">Source (UTM)</strong></td><td style="padding: 10px 16px; border-bottom: 1px solid rgba(30,64,175,0.6); font-size: 12px; color: #e5e7eb;"><?php echo $esc($data['source']); ?></td></tr><?php } ?>
                      <?php if (!empty($data['campaign_offer'])) { ?><tr><td style="padding: 10px 16px; font-size: 12px; color: #9ca3af;"><strong style="color: #e5e7eb;">Campaign offer</strong></td><td style="padding: 10px 16px; font-size: 12px; color: #e5e7eb;"><?php echo $esc($data['campaign_offer']); ?></td></tr><?php } ?>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <?php } ?>
          <!-- Footer -->
          <tr>
            <td style="background: radial-gradient(circle at 0 0, rgba(79,70,229,0.2) 0, transparent 60%), #020617; padding: 18px 28px 22px 28px; border-top: 1px solid rgba(30,64,175,0.7);">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">This email was sent from your <?php echo $esc($brand); ?> inquiry form. Submissions are stored in your database.</p>
              <p style="margin: 8px 0 0 0; font-size: 11px; color: #6b7280;">&copy; <?php echo date('Y'); ?> <?php echo $esc($brand); ?>. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
