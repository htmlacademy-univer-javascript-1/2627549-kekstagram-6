function isWithinLength(text, max) {
  let count = 0;
  const str = String(text);
  const limit = Number(max);

  for (let i = 0; i < str.length; i++) {
    count++;
    if (count > limit) {
      return false;
    }
  }
  return true;
}

function isPalindrome(value) {
  const s = String(value).toLowerCase().replace(/ /g, '');
  let reversed = '';

  for (let i = s.length - 1; i >= 0; i--) {
    reversed += s[i];
  }
  return s === reversed;
}

function extractNumber(input) {
  const str = String(input);
  let digits = '';

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch >= '0' && ch <= '9') {
      digits += ch;
    }
  }

  if (digits.length === 0) {
    return NaN;
  }
  return Number(digits);
}

window.isWithinLength = isWithinLength;
window.isPalindrome = isPalindrome;
window.extractNumber = extractNumber;

function toMinutes(timeStr) {
  const parts = String(timeStr).trim().split(':');
  const h = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  return h * 60 + m;
}

function isMeetingFits(workStart, workEnd, meetStart, duration) {
  const ws = toMinutes(workStart);
  const we = toMinutes(workEnd);
  const ms = toMinutes(meetStart);
  const me = ms + Number(duration);

  return ms >= ws && me <= we;
}

window.isMeetingFits = isMeetingFits;
