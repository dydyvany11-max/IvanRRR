export function validate(fieldId, value, rules) {
  const errEl = document.getElementById(`err-${fieldId}`);
  const inputEl = document.getElementById(fieldId);

  for (const { rule, msg, min, pattern } of rules) {
    let failed = false;
    if (rule === 'required' && !value) failed = true;
    if (rule === 'minLength' && value.length < min) failed = true;
    if (rule === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) failed = true;
    if (rule === 'pattern' && !pattern.test(value)) failed = true;

    if (failed) {
      if (errEl) errEl.textContent = msg;
      if (inputEl) inputEl.classList.add('invalid');
      return false;
    }
  }

  if (errEl) errEl.textContent = '';
  if (inputEl) inputEl.classList.remove('invalid');
  return true;
}
