package com.bussapp.web.service.dto;

public class JncDTO {
    private String texto;

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    @Override
    public String toString() {
        return "JncDTO{" +
            "texto='" + texto + '\'' +
            '}';
    }
}
