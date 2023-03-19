class ExpectationComparer
  attr_reader :key
  attr_reader :default_params
  attr_reader :prepared_records

  include RSpec::Matchers

  def initialize(key, default_params)
    @key = key
    @default_params = default_params
  end

  def values
    @default_params
  end

  def define_required_records_for_test(&block)
    @build_record_proc = block
  end

  def build_records_for_test
    @prepared_records = @build_record_proc.call
  end

  def define_expectation(&block)
    @expect_proc = block
  end

  def compare_to_expectation(exec_situation, **arg_values)
    values = @default_params.merge(arg_values)
    # 実行されるitブロック上で期待値チェックを行う（こうすることでit内でしか使えないexpectなどを使える）
    exec_situation.instance_exec(values, prepared_records, &@expect_proc)
  end
end