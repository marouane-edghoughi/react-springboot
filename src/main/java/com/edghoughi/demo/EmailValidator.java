package com.edghoughi.demo;

import org.springframework.stereotype.Component;

import java.util.function.Predicate;
import java.util.regex.Pattern;

@Component
public class EmailValidator implements Predicate<String> {

    private final Predicate<String> VALID_EMAIL_REGEX =
            Pattern.compile(
                    "!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i",
                    Pattern.CASE_INSENSITIVE
            ).asPredicate();

    @Override
    public boolean test(String email) {
        return VALID_EMAIL_REGEX.test(email);
    }

//    public boolean isEmailTaken(String email) {
//        String sql = "" +
//                "SELECT ";
//    }
}
