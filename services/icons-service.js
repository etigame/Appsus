export const iconsService = {
  getSvg,
}

const emailSvgs = {
  menu: `<svg focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>`,
  compose: `https://www.gstatic.com/images/icons/material/system_gm/1x/create_black_20dp.png`,
  search: `<svg focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path><path d="M0,0h24v24H0V0z" fill="none"></path></svg>`,
  advancedSearch: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path></svg>`,
  starBefore: `https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_baseline_nv700_20dp.png`,
  starBeforeWithHover: `https://www.gstatic.com/images/icons/material/system_gm/1x/star_border_black_20dp.png`,
  starActive: `https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_fill_googyellow500_20dp.png`,
  importantBefore: `https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/label_important_baseline_nv700_20dp.png`,
  importantBeforeWithHover: `https://www.gstatic.com/images/icons/material/system_gm/1x/label_important_outline_black_20dp.png`,
  importantActive: `https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/label_important_fill_googyellow500_20dp.png`,
  koogleApps: `<svg class="gb_Ve" focusable="false" width="24" height="24" viewBox="0 0 24 24"><path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path></svg>`,
  close: `https://ssl.gstatic.com/ui/v1/icons/mail/rfr/ic_close_16px_1x.png`,
  trash: `https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/delete_baseline_nv700_20dp.png`,
  closeMail: `https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/mail_baseline_nv700_20dp.png`,
  closeMailWithHover: `https://www.gstatic.com/images/icons/material/system_gm/1x/markunread_black_20dp.png`,
  openMail: `https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/drafts_baseline_nv700_20dp.png`,
  openMailWithHover: `https://www.gstatic.com/images/icons/material/system_gm/1x/drafts_black_20dp.png`,
  back: `https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/arrow_back_baseline_nv700_20dp.png`,
  inbox: `https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/inbox_baseline_nv700_20dp.png`,
  sent: `https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/send_baseline_nv700_20dp.png`,
  drafts: `https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/draft_baseline_nv700_20dp.png`,
}

function getSvg(iconName) {
  return emailSvgs[iconName]
}
