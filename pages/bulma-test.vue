<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Bulma Render Test</h1>
      <h2 class="subtitle">Layout</h2>
      <div class="level">
        <p class="level-item has-background-white ">
          Level Render test
        </p>
      </div>

      <h2 class="subtitle">Elements</h2>
      <div class="box">
        Box render test
      </div>

      <div class="box is-radiusless">
        Radiusless box render test
      </div>
      <h2 class="subtitle">Components</h2>
      <div class="card">
        <div class="card-content">
          Card render test
        </div>
      </div>

      <div class="spacing" />

      <article class="message is-info">
        <div class="message-header">
          <p>Message bloc Header</p>
          <button class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
          Message bloc body render test
        </div>
      </article>
      <article class="message is-info">
        <div class="message-body">
          Message with only body
        </div>
      </article>

      <nav class="panel is-primary has-background-white">
        <p class="panel-heading">
          Pannel heading
        </p>
        <div class="panel-block">
          Panel render test
        </div>
        <div class="panel-block">
          Footer
        </div>
      </nav>
    </div>
  </section>
</template>

<style lang="scss">
.spacing {
  margin-bottom: 1.5rem;
}
</style>
