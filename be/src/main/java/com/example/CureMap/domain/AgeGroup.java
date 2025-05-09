package com.example.CureMap.domain;

public enum AgeGroup {
    AGE_0_9("0~9세"),
    AGE_10_19("10~19세"),
    AGE_20_29("20~29세"),
    AGE_30_39("30~39세"),
    AGE_40_49("40~49세"),
    AGE_50_59("50~59세"),
    AGE_60_69("60~69세"),
    AGE_70_PLUS("70세 이상");

    private final String label;

    AgeGroup(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static AgeGroup fromAge(int age) {
        if (age < 10) return AGE_0_9;
        if (age < 20) return AGE_10_19;
        if (age < 30) return AGE_20_29;
        if (age < 40) return AGE_30_39;
        if (age < 50) return AGE_40_49;
        if (age < 60) return AGE_50_59;
        if (age < 70) return AGE_60_69;
        return AGE_70_PLUS;
    }
}
