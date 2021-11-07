package com.edghoughi.demo;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class EmailValidatorTest {

    private final EmailValidator underTest = new EmailValidator();

    @Test
    public void itShouldBeValidEmail() {
         assertThat(underTest.test("hello@gmail.com")).isTrue();
    }

}