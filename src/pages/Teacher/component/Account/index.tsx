// eslint-disable-next-line no-use-before-define
import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import { FormInstance } from "antd/lib/form";
import {
  doc,
  onSnapshot,
  collection,
  setDoc,
  Unsubscribe,
} from "firebase/firestore";
import db from "@/app/firebase";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  readonly id: string;
  name: string;
  email: string;
  birth: Date;
  phone: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

// interface DataType {
//   key: React.Key;
//   name: string;
//   id: string;
//   score1: number;
//   score2: number;
//   score3: number;
//   score4: number;
//   gpa: number;
// }
type DataType = Item;

interface EditableTableState {
  dataSource: DataType[];
  count: number;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export default class EditableTable extends React.Component<
  EditableTableProps,
  EditableTableState
> {
  columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[];

  private unsub?: Unsubscribe;

  constructor(props: EditableTableProps) {
    super(props);

    this.columns = [
      {
        title: "STT",
        dataIndex: "id",
      },
      {
        title: "Tên",
        dataIndex: "name",
        editable: true,
      },
      {
        title: "Email",
        dataIndex: "email",
        editable: true,
      },
      {
        title: "Ngày sinh",
        dataIndex: "birth",
        editable: true,
      },
      {
        title: "SDT",
        dataIndex: "phone",
        editable: true,
      },
      {
        title: "Action",
        dataIndex: "operation",
        // render: (_, record: any) =>
        //   this.state.dataSource.length >= 1 ? (
        //     <Popconfirm
        //       title="Sure to delete?"
        //       onConfirm={() => this.handleSend(record.key)}
        //     >
        //       <a>Gửi</a>
        //     </Popconfirm>
        //   ) : null,
      },
    ];

    this.state = {
      dataSource: [],
      // eslint-disable-next-line react/no-unused-state
      count: 4,
    };
  }

  async componentDidMount() {
    this.unsub = onSnapshot(collection(db, "users"), (doc) => {
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        count: doc.docs.length,
        dataSource: doc.docs.map((e) => ({
          id: e.id,
          ...e.data(),
        })) as DataType[],
      });
    });
  }

  componentWillUnmount(): void {
    if (this.unsub) this.unsub();
  }

  handleSend = (id: React.Key) => {};

  handleSave = async (row: DataType) => {
    const { id, ...dataWrite } = row;
    await setDoc(doc(db, "users", id), dataWrite);
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: DataType) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
          rowKey="id"
        />
      </div>
    );
  }
}
