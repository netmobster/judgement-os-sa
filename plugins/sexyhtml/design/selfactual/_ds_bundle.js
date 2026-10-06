/* @ds-bundle: {"format":4,"namespace":"SelfActualDesignSystem_f093ce","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"Tag","sourcePath":"components/actions/Tag.jsx"},{"name":"Table","sourcePath":"components/data/Table.jsx"},{"name":"EvidenceLegend","sourcePath":"components/evidence/EvidenceLegend.jsx"},{"name":"EvidenceRow","sourcePath":"components/evidence/EvidenceRow.jsx"},{"name":"EvidenceTag","sourcePath":"components/evidence/EvidenceTag.jsx"},{"name":"StackRow","sourcePath":"components/evidence/StackRow.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Segmented","sourcePath":"components/forms/Segmented.jsx"},{"name":"Nav","sourcePath":"components/navigation/Nav.jsx"},{"name":"Dialog","sourcePath":"components/overlay/Dialog.jsx"},{"name":"Console","sourcePath":"components/product/Console.jsx"},{"name":"ConsoleLoop","sourcePath":"components/product/Console.jsx"},{"name":"Slide","sourcePath":"components/slides/Slide.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"Ground","sourcePath":"components/surfaces/Ground.jsx"},{"name":"Hl","sourcePath":"components/surfaces/Ground.jsx"},{"name":"Panel","sourcePath":"components/surfaces/Panel.jsx"},{"name":"Quote","sourcePath":"components/surfaces/Quote.jsx"},{"name":"RuleNote","sourcePath":"components/surfaces/RuleNote.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"56ff225fbbf4","components/actions/Tag.jsx":"83b6ef7c6baf","components/data/Table.jsx":"0de845fc8965","components/evidence/EvidenceLegend.jsx":"59f147e8adf2","components/evidence/EvidenceRow.jsx":"2e129e78af50","components/evidence/EvidenceTag.jsx":"1e227f2d36aa","components/evidence/StackRow.jsx":"5de47e6ef683","components/forms/Field.jsx":"bcb2b74ca126","components/forms/Input.jsx":"fe43dcba4185","components/forms/Radio.jsx":"fcd0a2a8c624","components/forms/Segmented.jsx":"c86b18d896c8","components/navigation/Nav.jsx":"35c560baae53","components/overlay/Dialog.jsx":"d86797bd96c3","components/product/Console.jsx":"64255ced2388","components/slides/Slide.jsx":"17242e1a8b54","components/surfaces/Card.jsx":"1940e3c21bd4","components/surfaces/Ground.jsx":"6f2bb1d40a12","components/surfaces/Panel.jsx":"2021f8d4dcaa","components/surfaces/Quote.jsx":"05a417869126","components/surfaces/RuleNote.jsx":"6fdeb1b97d69","ui_kits/keep-yourself-deck/App.jsx":"fbb5293db88f","ui_kits/keep-yourself-deck/Slides.jsx":"c908196cc09e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SelfActualDesignSystem_f093ce = window.SelfActualDesignSystem_f093ce || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(' ');
function Button({
  variant = 'primary',
  icon,
  iconOnly,
  block,
  as: As = 'button',
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(As, _extends({
    className: cx('btn', 'btn-' + variant, iconOnly && 'btn-icon', block && 'btn-block', className)
  }, rest), icon, !iconOnly && children);
}
Object.assign(__ds_scope, { Button, __ds_default_components_actions_Button_8qpwqe: Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(' ');
function Tag({
  tone = 'accent',
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cx('tag', 'tag-' + tone, className)
  }, rest), children);
}
Object.assign(__ds_scope, { Tag, __ds_default_components_actions_Tag_626kly: Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/Table.jsx
try { (() => {
const cx = (...a) => a.filter(Boolean).join(' ');
function Table({
  columns = [],
  rows = [],
  className,
  style,
  children
}) {
  return /*#__PURE__*/React.createElement("table", {
    className: cx('table', className),
    style: style
  }, columns.length > 0 && /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i
  }, c)))), /*#__PURE__*/React.createElement("tbody", null, rows.length > 0 ? rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, r.map((c, j) => /*#__PURE__*/React.createElement("td", {
    key: j
  }, c)))) : children));
}
Object.assign(__ds_scope, { Table, __ds_default_components_data_Table_n4tmtn: Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Table.jsx", error: String((e && e.message) || e) }); }

// components/evidence/EvidenceTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(' ');
function EvidenceTag({
  state = 'shipped',
  children,
  className,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cx('ev', 'ev-' + state, className),
    style: style
  }, rest), children ?? (state === 'measured' && rest.note ? 'measured · ' + rest.note : state));
}
Object.assign(__ds_scope, { EvidenceTag, __ds_default_components_evidence_EvidenceTag_fboh7: EvidenceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/evidence/EvidenceTag.jsx", error: String((e && e.message) || e) }); }

// components/evidence/EvidenceLegend.jsx
try { (() => {
const cx = (...a) => a.filter(Boolean).join(' ');
function EvidenceLegend({
  states = ['shipped', 'measured', 'building', 'hypothesis'],
  className,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: cx('ev-legend', className),
    style: style
  }, states.map(s => /*#__PURE__*/React.createElement(__ds_scope.EvidenceTag, {
    key: s,
    state: s
  })));
}
Object.assign(__ds_scope, { EvidenceLegend, __ds_default_components_evidence_EvidenceLegend_kvrn5q: EvidenceLegend });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/evidence/EvidenceLegend.jsx", error: String((e && e.message) || e) }); }

// components/evidence/EvidenceRow.jsx
try { (() => {
const cx = (...a) => a.filter(Boolean).join(' ');
function EvidenceRow({
  figure,
  claim,
  state = 'shipped',
  tagLabel,
  open,
  className,
  style,
  children
}) {
  const isOpen = open ?? state === 'hypothesis';
  return /*#__PURE__*/React.createElement("div", {
    className: cx('ev-row', isOpen && 'ev-row-open', className),
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "ev-row-figure"
  }, figure), /*#__PURE__*/React.createElement("div", {
    className: "ev-row-claim"
  }, claim ?? children), /*#__PURE__*/React.createElement(__ds_scope.EvidenceTag, {
    state: state
  }, tagLabel));
}
Object.assign(__ds_scope, { EvidenceRow, __ds_default_components_evidence_EvidenceRow_fbn5z: EvidenceRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/evidence/EvidenceRow.jsx", error: String((e && e.message) || e) }); }

// components/evidence/StackRow.jsx
try { (() => {
const cx = (...a) => a.filter(Boolean).join(' ');
function StackRow({
  label,
  verb,
  items,
  keep,
  columns,
  itemsStyle,
  className,
  style,
  children
}) {
  const s = columns ? {
    gridTemplateColumns: columns,
    ...style
  } : style;
  return /*#__PURE__*/React.createElement("div", {
    className: cx('stack-row', keep && 'stack-row-keep', className),
    style: s
  }, /*#__PURE__*/React.createElement("div", {
    className: "stack-row-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "stack-row-verb"
  }, verb), /*#__PURE__*/React.createElement("div", {
    className: "stack-row-items",
    style: itemsStyle
  }, items ? items.map((it, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, it)) : children));
}
Object.assign(__ds_scope, { StackRow, __ds_default_components_evidence_StackRow_gm0b16: StackRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/evidence/StackRow.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
const cx = (...a) => a.filter(Boolean).join(' ');
function Field({
  label,
  id,
  hint,
  className,
  style,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: cx('field', className),
    style: style
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: id
  }, label), children, hint && /*#__PURE__*/React.createElement("div", {
    className: "text-muted",
    style: {
      fontSize: 12,
      marginTop: 4
    }
  }, hint));
}
Object.assign(__ds_scope, { Field, __ds_default_components_forms_Field_jq849g: Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(' ');
function Input({
  multiline,
  className,
  ...rest
}) {
  const As = multiline ? 'textarea' : 'input';
  return /*#__PURE__*/React.createElement(As, _extends({
    className: cx('input', className)
  }, rest));
}
Object.assign(__ds_scope, { Input, __ds_default_components_forms_Input_jsghkw: Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(' ');
function Radio({
  label,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: cx('radio', className)
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), label ?? children);
}
Object.assign(__ds_scope, { Radio, __ds_default_components_forms_Radio_jyiy9r: Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Segmented.jsx
try { (() => {
const cx = (...a) => a.filter(Boolean).join(' ');
function Segmented({
  options = [],
  value,
  defaultValue,
  onChange,
  name,
  className,
  style
}) {
  const [inner, setInner] = React.useState(defaultValue ?? (options[0] && (options[0].value ?? options[0])));
  const cur = value ?? inner;
  const nm = name || React.useId();
  return /*#__PURE__*/React.createElement("div", {
    className: cx('seg', className),
    style: style
  }, options.map(o => {
    const v = o.value ?? o,
      l = o.label ?? o;
    return /*#__PURE__*/React.createElement("label", {
      key: v,
      className: "seg-opt"
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: nm,
      checked: cur === v,
      onChange: () => {
        setInner(v);
        onChange && onChange(v);
      }
    }), l);
  }));
}
Object.assign(__ds_scope, { Segmented, __ds_default_components_forms_Segmented_15kkggc: Segmented });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Segmented.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Nav.jsx
try { (() => {
const cx = (...a) => a.filter(Boolean).join(' ');
function Nav({
  brand = 'selfActual',
  logo,
  links = [],
  action,
  className,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    className: cx('nav', className),
    style: style
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-brand"
  }, logo ? /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: brand,
    style: {
      height: 22,
      width: 'auto'
    }
  }) : brand), links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: l.href || '#',
    "aria-current": l.current ? 'page' : undefined,
    onClick: l.onClick
  }, l.label)), action);
}
Object.assign(__ds_scope, { Nav, __ds_default_components_navigation_Nav_189qnj2: Nav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Nav.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Dialog.jsx
try { (() => {
const cx = (...a) => a.filter(Boolean).join(' ');
function Dialog({
  open = true,
  title,
  actions,
  onClose,
  inline,
  className,
  style,
  children
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "dialog-backdrop",
    style: inline ? {
      position: 'absolute'
    } : undefined,
    onClick: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    className: cx('dialog', className),
    style: style
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "dialog-title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "dialog-body"
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    className: "dialog-actions"
  }, actions)));
}
Object.assign(__ds_scope, { Dialog, __ds_default_components_overlay_Dialog_1b5khx7: Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/product/Console.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(' ');
function Console({
  brand = 'selfactual',
  product = 'insights',
  status,
  insight,
  sections = [],
  className,
  style,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: cx('console', className),
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "console-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "console-brand"
  }, brand, " ", /*#__PURE__*/React.createElement("em", null, product)), status && /*#__PURE__*/React.createElement("div", {
    className: "console-status"
  }, /*#__PURE__*/React.createElement("span", {
    className: "console-dot"
  }), status)), insight && /*#__PURE__*/React.createElement("div", {
    className: "console-insight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "console-label"
  }, insight.label ?? 'Insight'), /*#__PURE__*/React.createElement("div", {
    className: "console-text"
  }, insight.text), insight.actions && /*#__PURE__*/React.createElement("div", {
    className: "console-actions"
  }, insight.actions.map((a, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    className: cx('console-chip', a.primary && 'console-chip-primary'),
    onClick: a.onClick
  }, a.label)))), sections.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "console-section"
  }, s.title, s.count && /*#__PURE__*/React.createElement("span", null, s.count)), (s.rows || []).map((r, j) => /*#__PURE__*/React.createElement("div", {
    key: j,
    className: cx('console-row', r.locked && 'console-row-locked')
  }, /*#__PURE__*/React.createElement("span", {
    className: "console-key"
  }, r.key), /*#__PURE__*/React.createElement("span", {
    className: "console-val"
  }, r.value), /*#__PURE__*/React.createElement("span", {
    className: "console-state"
  }, r.state))))), children);
}
function ConsoleLoop({
  children = 'ask → dispatch → work → report → room → decide → dispatch again · nobody is the courier',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "console-loop"
  }, rest), children);
}
Object.assign(__ds_scope, { Console, ConsoleLoop, __ds_default_components_product_Console_hfrefx: Console });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/Console.jsx", error: String((e && e.message) || e) }); }

// components/slides/Slide.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(' ');
function Slide({
  ink,
  kicker,
  date,
  number,
  logo,
  showLogo = true,
  title,
  display,
  lead,
  foot,
  className,
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    className: cx('slide', ink && 'slide-ink', className),
    style: {
      width: 1920,
      height: 1080,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "slide-head"
  }, kicker ? /*#__PURE__*/React.createElement("span", {
    className: "slide-kicker"
  }, kicker) : logo && /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "",
    style: {
      height: 60,
      width: 'auto'
    }
  }), date && /*#__PURE__*/React.createElement("span", {
    className: "slide-date"
  }, date)), /*#__PURE__*/React.createElement("div", null, display && /*#__PURE__*/React.createElement("h1", {
    className: "slide-display"
  }, display), title && /*#__PURE__*/React.createElement("h1", {
    className: "slide-title"
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    className: "slide-lead",
    style: {
      marginTop: 36,
      maxWidth: '46ch'
    }
  }, lead), children), /*#__PURE__*/React.createElement("div", {
    className: "slide-foot",
    style: ink ? {
      borderTop: '1px solid var(--color-ink-line)',
      paddingTop: 26
    } : undefined
  }, foot ?? (showLogo && logo && kicker ? /*#__PURE__*/React.createElement("img", {
    className: "slide-logo",
    src: logo,
    alt: ""
  }) : /*#__PURE__*/React.createElement("span", null)), number && /*#__PURE__*/React.createElement("span", {
    className: "slide-number"
  }, number)));
}
Object.assign(__ds_scope, { Slide, __ds_default_components_slides_Slide_bjgypq: Slide });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/slides/Slide.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(' ');
function Card({
  kicker,
  title,
  meta,
  focus,
  ink,
  className,
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx('card', focus && 'card-focus', ink && 'card-ink', className),
    style: style
  }, rest), kicker && /*#__PURE__*/React.createElement("div", {
    className: "card-kicker"
  }, kicker), title && /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, title), typeof children === 'string' ? /*#__PURE__*/React.createElement("p", {
    className: "card-body"
  }, children) : children, meta && /*#__PURE__*/React.createElement("div", {
    className: "card-meta"
  }, meta));
}
Object.assign(__ds_scope, { Card, __ds_default_components_surfaces_Card_1fqoa5b: Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Ground.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(' ');
function Ground({
  ink,
  className,
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx(ink ? 'on-ink' : 'on-light', className),
    style: style
  }, rest), children);
}
function Hl({
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "hl"
  }, rest), children);
}
Object.assign(__ds_scope, { Ground, Hl, __ds_default_components_surfaces_Ground_lbcyd0: Ground });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Ground.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Panel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(' ');
function Panel({
  elevation,
  className,
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx('panel', elevation && 'elev-' + elevation, className),
    style: style
  }, rest), children);
}
Object.assign(__ds_scope, { Panel, __ds_default_components_surfaces_Panel_2yqc0l: Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Panel.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Quote.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(' ');
function Quote({
  className,
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("blockquote", _extends({
    className: cx('quote', className),
    style: style
  }, rest), children);
}
Object.assign(__ds_scope, { Quote, __ds_default_components_surfaces_Quote_2zv6vn: Quote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Quote.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/RuleNote.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cx = (...a) => a.filter(Boolean).join(' ');
function RuleNote({
  className,
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx('rule-note', className),
    style: style
  }, rest), children);
}
Object.assign(__ds_scope, { RuleNote, __ds_default_components_surfaces_RuleNote_1m3qjn7: RuleNote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/RuleNote.jsx", error: String((e && e.message) || e) }); }

// ui_kits/keep-yourself-deck/App.jsx
try { (() => {
const {
  Button
} = window.SelfActualDesignSystem_f093ce;
function App() {
  const date = '7 Sept 2026';
  const [i, setI] = React.useState(() => Number(localStorage.getItem('sa-deck-slide') || 0));
  const [insight, setInsight] = React.useState(/*#__PURE__*/React.createElement(React.Fragment, null, "You moved ", /*#__PURE__*/React.createElement("b", null, "SA-212"), " to Monday in ChatGPT two minutes ago. Claude and the web already show it."));
  const onAction = a => setInsight(a === 'ledger' ? /*#__PURE__*/React.createElement(React.Fragment, null, "Ledger opened. ", /*#__PURE__*/React.createElement("b", null, "69/69"), " writes, 0 failures.") : /*#__PURE__*/React.createElement(React.Fragment, null, "Move undone. ", /*#__PURE__*/React.createElement("b", null, "SA-212"), " is back on Friday in every window."));
  const slides = [/*#__PURE__*/React.createElement(CoverSlide, {
    date: date
  }), /*#__PURE__*/React.createElement(ProblemSlide, {
    date: date
  }), /*#__PURE__*/React.createElement(StackSlide, {
    date: date
  }), /*#__PURE__*/React.createElement(EvidenceSlide, {
    date: date
  }), /*#__PURE__*/React.createElement(WindowSlide, {
    date: date,
    insight: insight,
    onAction: onAction
  }), /*#__PURE__*/React.createElement(CloseSlide, {
    date: date
  })];
  const n = slides.length;
  const go = d => setI(x => Math.max(0, Math.min(n - 1, x + d)));
  React.useEffect(() => {
    localStorage.setItem('sa-deck-slide', i);
  }, [i]);
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowRight' || e.key === ' ') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, []);
  const ref = React.useRef();
  const [s, setS] = React.useState(0.5);
  React.useEffect(() => {
    const f = () => {
      const r = ref.current.getBoundingClientRect();
      setS(Math.min(r.width / 1920, r.height / 1080));
    };
    f();
    addEventListener('resize', f);
    return () => removeEventListener('resize', f);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'grid',
      gridTemplateRows: '1fr auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      display: 'grid',
      placeItems: 'center',
      overflow: 'hidden',
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1920 * s,
      height: 1080 * s,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: 'scale(' + s + ')',
      transformOrigin: 'top left',
      position: 'absolute',
      inset: 0
    }
  }, slides[i]))), /*#__PURE__*/React.createElement("div", {
    className: "on-ink",
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      padding: '8px 16px 14px',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--color-ink-dim)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => go(-1),
    disabled: i === 0
  }, "Prev"), /*#__PURE__*/React.createElement("span", {
    className: "deck-counter"
  }, String(i + 1).padStart(2, '0'), " / ", String(n).padStart(2, '0')), /*#__PURE__*/React.createElement(Button, {
    onClick: () => go(1),
    disabled: i === n - 1
  }, "Next")));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/keep-yourself-deck/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/keep-yourself-deck/Slides.jsx
try { (() => {
const DS = window.SelfActualDesignSystem_f093ce;
const {
  Slide,
  Hl,
  EvidenceTag,
  EvidenceLegend,
  EvidenceRow,
  StackRow,
  Panel,
  RuleNote,
  Console
} = DS;
const LOGO = '../../assets/selfactual-logo.png';
const T24 = {
  fontSize: 24
};
const ET = (s, l) => /*#__PURE__*/React.createElement(EvidenceTag, {
  state: s,
  style: T24
}, l);
function CoverSlide({
  date
}) {
  return /*#__PURE__*/React.createElement(Slide, {
    ink: true,
    logo: LOGO,
    date: 'Internal · ' + date,
    display: /*#__PURE__*/React.createElement(React.Fragment, null, "Choose your AI.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Hl, null, "Keep yourself.")),
    lead: "Use whatever models, tools, agents and infrastructure you want. selfActual is the operator layer that stays yours.",
    number: "01",
    "data-screen-label": "01",
    foot: /*#__PURE__*/React.createElement(EvidenceLegend, {
      style: T24
    })
  });
}
function ProblemSlide({
  date
}) {
  return /*#__PURE__*/React.createElement(Slide, {
    kicker: "02 \xB7 The problem",
    date: date,
    number: "02",
    logo: LOGO,
    "data-screen-label": "02"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 88
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "slide-title"
  }, "Every time your AI changes,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Hl, null, "you start over.")), /*#__PURE__*/React.createElement("p", {
    className: "slide-lead",
    style: {
      marginTop: 36,
      maxWidth: '40ch'
    }
  }, "New model, new tool, new agent, new teammate. Each one begins with you re-explaining how you think, how you work and how you fail."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 34,
      lineHeight: 1.4,
      margin: '28px 0 0',
      fontWeight: 700
    }
  }, "The switching cost of AI isn't the model. It's you.")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 600px'
    }
  }, /*#__PURE__*/React.createElement(Panel, null, /*#__PURE__*/React.createElement("div", {
    className: "card-kicker",
    style: T24
  }, "Every new window"), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '28px 0 26px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, [100, 76, 48].map(w => /*#__PURE__*/React.createElement("div", {
    key: w,
    style: {
      height: 14,
      borderRadius: 999,
      background: 'var(--color-neutral-400)',
      width: w + '%'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 29,
      color: 'var(--color-neutral-700)',
      fontStyle: 'italic'
    }
  }, "\"So \u2014 tell me about yourself.\"")))));
}
function StackSlide({
  date
}) {
  const cols = '220px 300px 1fr',
    rs = {
      padding: '13px 26px'
    };
  const L = t => /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 27
      }
    }, t),
    V = t => /*#__PURE__*/React.createElement("span", {
      style: T24
    }, t);
  return /*#__PURE__*/React.createElement(Slide, {
    kicker: "03 \xB7 Portability was never about models",
    date: date,
    number: "03",
    logo: LOGO,
    "data-screen-label": "03"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 70
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "slide-title",
    style: {
      flex: '0 0 46%',
      fontSize: 60
    }
  }, "Swap any layer.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Hl, null, "Only one has to stay.")), /*#__PURE__*/React.createElement("p", {
    className: "slide-lead",
    style: {
      flex: 1,
      fontSize: 27
    }
  }, "Not a feature list \u2014 demonstrations of the same operation, tagged by what actually swaps today.")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 25
    }
  }, /*#__PURE__*/React.createElement(StackRow, {
    columns: cols,
    style: rs,
    itemsStyle: {
      fontSize: 25
    },
    label: L('Intelligence'),
    verb: V('Swap the model'),
    items: [/*#__PURE__*/React.createElement(React.Fragment, null, "Claude \xB7 Claude Code \xB7 Copilot ", ET('shipped')), /*#__PURE__*/React.createElement(React.Fragment, null, "ChatGPT ", ET('measured')), /*#__PURE__*/React.createElement(React.Fragment, null, "Gemini \xB7 local ", ET('hypothesis'))]
  }), /*#__PURE__*/React.createElement(StackRow, {
    columns: cols,
    style: rs,
    itemsStyle: {
      fontSize: 25
    },
    label: L('Tools'),
    verb: V('Swap where the work lives'),
    items: [/*#__PURE__*/React.createElement(React.Fragment, null, "External links on tasks ", ET('shipped')), /*#__PURE__*/React.createElement(React.Fragment, null, "Notion \xB7 Asana \xB7 Linear ", ET('hypothesis'))]
  }), /*#__PURE__*/React.createElement(StackRow, {
    columns: cols,
    style: rs,
    itemsStyle: {
      fontSize: 25
    },
    label: L('Infrastructure'),
    verb: V('Swap where it runs'),
    items: [/*#__PURE__*/React.createElement(React.Fragment, null, "SA cloud ", ET('shipped')), /*#__PURE__*/React.createElement(React.Fragment, null, "SUMMIT account ", ET('building')), /*#__PURE__*/React.createElement(React.Fragment, null, "Own machine ", ET('hypothesis'))]
  }), /*#__PURE__*/React.createElement(StackRow, {
    keep: true,
    columns: cols,
    style: {
      padding: '18px 26px'
    },
    label: L('Operator layer'),
    verb: V("Don't swap this")
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 25
    }
  }, "State \xB7 profile \xB7 judgment \xB7 ledger. ", /*#__PURE__*/React.createElement("b", null, "Yours. Constant. selfActual."))))));
}
function EvidenceSlide({
  date
}) {
  const rs = {
    gridTemplateColumns: '190px 1fr 210px',
    gap: 22,
    padding: '7px 26px',
    fontSize: 25
  };
  const F = t => /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 32
    }
  }, t);
  return /*#__PURE__*/React.createElement(Slide, {
    kicker: "04 \xB7 The evidence ledger",
    date: date,
    number: "04",
    logo: LOGO,
    "data-screen-label": "04"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 70
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "slide-title",
    style: {
      flex: 1,
      fontSize: 54
    }
  }, "Small numbers. All of them true."), /*#__PURE__*/React.createElement("p", {
    className: "slide-lead",
    style: {
      flex: '0 0 44%',
      fontSize: 28
    }
  }, "The bigger the claim on the cover, the smaller the numbers underneath have to be allowed to look.")), /*#__PURE__*/React.createElement("div", {
    className: "deck-ledger"
  }, /*#__PURE__*/React.createElement(EvidenceRow, {
    style: rs,
    figure: F('3'),
    state: "shipped",
    tagLabel: /*#__PURE__*/React.createElement("span", {
      style: T24
    }, "shipped"),
    claim: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 25
      }
    }, "Live transports on one page \u2014 artifact, web, ChatGPT \u2014 zero logic rewritten")
  }), /*#__PURE__*/React.createElement(EvidenceRow, {
    style: rs,
    figure: F('7 of 7'),
    state: "measured",
    tagLabel: /*#__PURE__*/React.createElement("span", {
      style: T24
    }, "measured \xB7 staging"),
    claim: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 25
      }
    }, "Heartbeat end to end on staging; 80 tests, 33 of 34 planted defects caught")
  }), /*#__PURE__*/React.createElement(EvidenceRow, {
    style: rs,
    figure: F('206→150'),
    state: "measured",
    tagLabel: /*#__PURE__*/React.createElement("span", {
      style: T24
    }, "measured"),
    claim: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 25
      }
    }, "P0/P1 board in one triage pass \u2014 69 decisions, 69/69 writes, 0 failures")
  }), /*#__PURE__*/React.createElement(EvidenceRow, {
    style: rs,
    figure: F('Local'),
    state: "hypothesis",
    tagLabel: /*#__PURE__*/React.createElement("span", {
      style: T24
    }, "hypothesis"),
    claim: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 25
      }
    }, "Whether vault and model on one desk run the same page unchanged. Nobody has done it yet")
  }))));
}
function WindowSlide({
  date,
  insight,
  onAction
}) {
  return /*#__PURE__*/React.createElement(Slide, {
    kicker: "05 \xB7 Keep, as in running \u2014 not as in backup",
    date: date,
    number: "05",
    logo: LOGO,
    "data-screen-label": "05"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 70
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 44%'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "slide-title",
    style: {
      fontSize: 62
    }
  }, "Export is a zip file. ", /*#__PURE__*/React.createElement(Hl, null, "This is a thing that's on.")), /*#__PURE__*/React.createElement(RuleNote, {
    style: {
      fontSize: 28,
      marginTop: 34
    }
  }, "Heartbeat pushes, gates hold, and every insight ends in a button because the profile said so.")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
      fontSize: 24
    },
    className: "deck-console"
  }, /*#__PURE__*/React.createElement(Console, {
    style: {
      width: 860
    },
    status: "heartbeat \xB7 3 windows open",
    insight: {
      text: insight,
      actions: [{
        label: 'Open the ledger',
        primary: true,
        onClick: () => onAction('ledger')
      }, {
        label: 'Undo',
        onClick: () => onAction('undo')
      }]
    },
    sections: [{
      title: 'Mirror · what this AI loaded',
      count: '14 of 35',
      rows: [{
        key: 'working-rhythm',
        value: 'Bursts, then long tails. Never schedule the tail.',
        state: 'core'
      }, {
        key: 'finances',
        value: 'Gated — opens only on your spoken phrase',
        state: 'locked',
        locked: true
      }]
    }]
  }))));
}
function CloseSlide({
  date
}) {
  return /*#__PURE__*/React.createElement(Slide, {
    ink: true,
    logo: LOGO,
    date: date,
    display: /*#__PURE__*/React.createElement(React.Fragment, null, "Choose your AI.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Hl, null, "Keep yourself.")),
    number: "06",
    "data-screen-label": "06"
  });
}
Object.assign(window, {
  CoverSlide,
  ProblemSlide,
  StackSlide,
  EvidenceSlide,
  WindowSlide,
  CloseSlide
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/keep-yourself-deck/Slides.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.EvidenceLegend = __ds_scope.EvidenceLegend;

__ds_ns.EvidenceRow = __ds_scope.EvidenceRow;

__ds_ns.EvidenceTag = __ds_scope.EvidenceTag;

__ds_ns.StackRow = __ds_scope.StackRow;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Segmented = __ds_scope.Segmented;

__ds_ns.Nav = __ds_scope.Nav;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Console = __ds_scope.Console;

__ds_ns.ConsoleLoop = __ds_scope.ConsoleLoop;

__ds_ns.Slide = __ds_scope.Slide;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Ground = __ds_scope.Ground;

__ds_ns.Hl = __ds_scope.Hl;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.Quote = __ds_scope.Quote;

__ds_ns.RuleNote = __ds_scope.RuleNote;

})();
