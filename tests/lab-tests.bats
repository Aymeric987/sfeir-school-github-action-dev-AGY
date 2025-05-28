setup() {
  DIR="$(cd "$(dirname "$BATS_TEST_FILENAME")" >/dev/null 2>&1 && pwd)"
  PATH="$DIR/../scripts:$PATH"

  load "$DIR/test_helper/bats-support/load"
  load "$DIR/test_helper/bats-assert/load"
}

@test "check addition is working" {
    run addition.sh 5 5
    assert_output 10
}

@test "check addition is not working" {
    run addition.sh 5
    assert_failure
    assert_output --partial "command line arguments are missing"
}