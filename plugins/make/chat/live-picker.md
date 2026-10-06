# The live picker: decisions in the chat

**Decisions are asked in this form, always** (Jay, 2 Oct 2026, the first one: "Always this form").
The `AskUserQuestion` modal is the fallback only when the widget tool isn't in the session. The
session-close gates and a check-in *offer* stay plain prose.

**Q&A here; larger reports on a page.** When the decisions sit inside findings that need room, or will
be answered later or on a phone, make the sexyhtml MultiChoice page instead: it keeps its own answers.
If the context needs more than a short reply above the form, it's a page.

## How it works

- `show_widget` with an elicitation form, `<form class="elicit">`. The shell wires the pills, the
  "Other" reveal and Continue by itself: no `<script>`, no `onclick`.
- When the user hits Continue, the answers arrive as their **next message, on one line**:
  `Make details — Front door: One /make router … · Chat look: … · Notes: …`. Labels are the
  `data-name`s in sentence case; multi-select values are comma-joined; long notes come under a fold.
  Skip arrives as `(Skipped the form — proceed with defaults or ask me in plain text)`.
- Load the visualize guide once a session first (`read_me` with `elicitation`), without mentioning it.

## The rules

1. **Infer first.** Ask only what can't be worked out from the conversation.
2. **Questions, not labels.** "Where should the tools live?", never "Location:".
3. **The recommended option first**, its subtitle starting "Recommended."
4. **Cards** (icon, title, one-line subtitle) when an option needs its context; **plain pills** for
   short labels; a **slider** for a scale; a **date** input for a date. With three or more questions,
   at least one group is cards.
5. **An "Other" escape hatch** (`data-other` and an `.elicit-other` input) on any question that could
   have an answer that isn't listed.
6. **`data-value` reads on its own**: it's what comes back. `data-multi="true"` when more than one
   answer can be true.
7. **A notes box last.**
8. **The chrome is fixed.** The header reads "<subject> details" with the icon below, byte for byte, and
   the footer is Skip and Continue. The form keeps Claude's look; only the options' own shapes vary.
9. **The findings go in the reply after the form**, never inside it, and short: the form is the point.
10. **Tabler outline icons only** (`<i class="ti ti-check">`), never `-filled`, never emoji.

## Template

```html
<h2 class="sr-only">One sentence on what the form decides.</h2>
<form class="elicit">
  <div class="elicit-header">
    <svg viewBox="0 0 20 20" fill="currentColor"><path d="M11.586 2a1.5 1.5 0 0 1 1.06.44l2.914 2.914a1.5 1.5 0 0 1 .44 1.06V16.5a1.5 1.5 0 0 1-1.5 1.5h-9a1.5 1.5 0 0 1-1.492-1.347L4 16.5v-13A1.5 1.5 0 0 1 5.5 2zM5.5 3a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h-2.5A1.5 1.5 0 0 1 11 5.5V3zm7.04 10.304a.5.5 0 0 1 .92.392c-.295.69-.871 1.304-1.66 1.304-.487 0-.892-.234-1.2-.574-.309.34-.713.574-1.2.574-.486 0-.892-.233-1.2-.574-.31.34-.714.574-1.2.574a.5.5 0 0 1 0-1c.212 0 .52-.18.74-.696l.034-.067a.5.5 0 0 1 .886.067c.221.516.528.696.74.696.213 0 .52-.18.74-.696l.035-.067a.5.5 0 0 1 .885.067c.22.516.527.696.74.696s.519-.18.74-.696m0-4a.5.5 0 0 1 .92.392c-.295.69-.871 1.304-1.66 1.304-.487 0-.892-.234-1.2-.574-.309.34-.713.574-1.2.574-.486 0-.892-.233-1.2-.574-.31.34-.714.574-1.2.574a.5.5 0 0 1 0-1c.212 0 .52-.18.74-.696l.034-.067a.5.5 0 0 1 .886.067c.221.516.528.696.74.696.213 0 .52-.18.74-.696l.035-.067a.5.5 0 0 1 .885.067c.22.516.527.696.74.696s.519-.18.74-.696M12 5.5a.5.5 0 0 0 .5.5h2.293L12 3.207z"/></svg>
    <span>Subject details</span>
  </div>
  <div class="elicit-body">
    <div class="elicit-group">
      <label class="elicit-question">The question, as a question?</label>
      <div class="elicit-pills" data-name="short_name" data-multi="false">
        <button type="button" class="elicit-pill" data-value="What comes back for this option" style="border-radius:12px; padding:14px 16px; display:flex; gap:12px; align-items:flex-start; text-align:left; min-width:180px; box-shadow:0 1px 2px rgba(0,0,0,0.04)">
          <i class="ti ti-check" style="font-size:20px" aria-hidden="true"></i>
          <span><span style="font-size:13px; font-weight:500">Option</span><br><span style="font-size:11px; color:var(--text-muted)">Recommended. Why, in one line</span></span>
        </button>
        <button type="button" class="elicit-pill" data-value="Other" data-other>Other</button>
      </div>
      <input type="text" class="elicit-other" data-for="short_name" placeholder="Tell me more" hidden>
    </div>
    <div class="elicit-group">
      <label class="elicit-question">A short-label question?</label>
      <div class="elicit-pills" data-name="second" data-multi="false">
        <button type="button" class="elicit-pill" data-value="Yes">Yes</button>
        <button type="button" class="elicit-pill" data-value="No">No</button>
      </div>
    </div>
    <div class="elicit-group">
      <label class="elicit-question">Anything else?</label>
      <textarea class="elicit-textarea" data-name="notes" placeholder="Optional"></textarea>
    </div>
  </div>
  <div class="elicit-footer">
    <button type="button" class="elicit-skip">Skip</button>
    <button type="button" class="elicit-submit">Continue</button>
  </div>
</form>
```

*First used 2 Oct 2026 (CC-71) for the three questions that set this standard. Jay: "whoa ... why has
nobody done this before?!!!"*
