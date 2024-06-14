describe('ChatGPT API', () => {
  it('shows output of chatgpt api', () => {
    cy.visit('http://localhost:3000')
    cy.get('button').contains(" Create a soundbite ").click()
    cy.get('input[type=file]').invoke('show').selectFile('../audio77.flac')
    
    cy.get('button').contains("Generate SoundBite").click()
    cy.wait(10000)
    cy.contains("is a nightmare war is awful it is indifferent it's devastating a level war is hell and yeah he's also an incredible teacher a brutal teacher and it teaches you resting");
  });
});