const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbxJxIG8dT9XYvxt4RQOQo5YtHvYYyjAsc7fAwNBQA9IiNKSCYOwH7RRk16kJJF-jnY/exec";

  try {
    console.log("Envoi du formulaire à :", scriptURL);
    console.log("Données du formulaire :", formData);

    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.result === "success") {
      toast({
        title: "Message envoyé !",
        description: "Merci pour votre message.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Erreur d'envoi :", error);
    toast({
      title: "Erreur !",
      description: "Échec de l'envoi.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};
